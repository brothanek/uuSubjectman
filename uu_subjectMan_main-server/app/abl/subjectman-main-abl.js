"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/subjectman-main-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },

};

const STATE_ACTIVE = "active";
const STATE_UNDER_CONSTRUCTION = "underConstruction";
const STATE_CLOSED = "closed";
const AUTHORITIES = "Authorities";
const EXECUTIVES = "Executives";


const logger = LoggerFactory.get("SubjectmanMainAbl");

class SubjectmanMainAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subjectman");
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // HDS 1
    let subjectManInstance = await this.dao.getByAwid(awid);

    // A1
    if (subjectManInstance) {
      throw new Errors.Init.SubjectmanInstanceAlreadyInitialized();
    }

    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    const schemas = ["subjectman"];
    let schemaCreateResults = schemas.map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // A3
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    dtoIn.awid = awid;

    try {
      subjectManInstance = await this.dao.create(dtoIn);
    } catch (e) {
      // A4
      if (e instanceof ObjectStoreError) {
        throw new Errors.Init.SubjectmanInstanceDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (dtoIn.uuBtLocationUri) {
      const baseUri = uri.getBaseUri();
      const uuBtUriBuilder = UriBuilder.parse(dtoIn.uuBtLocationUri);
      const location = uuBtUriBuilder.getParameters().id;
      const uuBtBaseUri = uuBtUriBuilder.toUri().getBaseUri();

      const createAwscDtoIn = {
        name: "UuSubjectman",
        typeCode: "uu-subjectman-maing01",
        location: location,
        uuAppWorkspaceUri: baseUri,
      };

      const awscCreateUri = uuBtUriBuilder.setUseCase("uuAwsc/create").toUri();
      const appClientToken = await AppClientTokenService.createToken(uri, uuBtBaseUri);
      const callOpts = AppClientTokenService.setToken({ session }, appClientToken);

      // TODO HDS
      let awscId;
      try {
        const awscDtoOut = await AppClient.post(awscCreateUri, createAwscDtoIn, callOpts);
        awscId = awscDtoOut.id;
      } catch (e) {
        if (e.code.includes("applicationIsAlreadyConnected") && e.paramMap.id) {
          logger.warn(`Awsc already exists id=${e.paramMap.id}.`, e);
          awscId = e.paramMap.id;
        } else {
          throw new Errors.Init.CreateAwscFailed({ uuAppErrorMap }, { location: dtoIn.uuBtLocationUri }, e);
        }
      }

      const artifactUri = uuBtUriBuilder.setUseCase(null).clearParameters().setParameter("id", awscId).toUri();

      await UuAppWorkspace.connectArtifact(
        baseUri,
        {
          artifactUri: artifactUri.toString(),
          synchronizeArtifactBasicAttributes: false,
        },
        session
      );
    }

    // HDS 3
    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await Profile.set(awid, "Authorities", dtoIn.uuAppProfileAuthorities);
      } catch (e) {
        if (e instanceof UuAppWorkspaceError) {
          // A4
          throw new Errors.Init.SetProfileFailed({ uuAppErrorMap }, { role: dtoIn.uuAppProfileAuthorities }, e);
        }
        throw e;
      }
    }

    // HDS 4 - HDS N
    // TODO Implement according to application needs...

    // HDS N+1
    const workspace = UuAppWorkspace.get(awid);

    return {
      ...workspace,
      uuAppErrorMap: uuAppErrorMap,
    };
  }

  async load(awid, authorizationResult, session) {
    // hds 1, A1, hds 1.1, A2
    let subjectmanInstance = await this.checkInstance(
      awid,
      Errors.Load.SubjectmanDoesNotExist,
      Errors.Load.SubjectmanNotInProperState
    );

    // A3
    let authorizedProfiles = authorizationResult.getIdentityProfiles();
    if (
      subjectmanInstance.state === STATE_UNDER_CONSTRUCTION &&
      !authorizedProfiles.includes(AUTHORITIES) &&
      !authorizedProfiles.includes(EXECUTIVES)
    ) {
      throw new Errors.Load.SubjectmanIsUnderConstruction({}, { state: subjectmanInstance.state });
    }

    // hds 3
    subjectmanInstance.authorizedProfileList = authorizedProfiles;

    // HDS 4
    return subjectmanInstance;
  }

  /**
   * Checks whether subjectman instance exists and that it is not in closed state.
   * @param {String} awid Used awid
   * @param {Error} notExistError Error thrown when subjectman instance does not exist
   * @param {Error} closedStateError Error thrown when subjectman instance is in closed state
   * @returns {Promise<{}>} subjectman instance
   */
  async checkInstance(awid, notExistError, closedStateError) {
    let subjectmanInstance = await this.dao.getByAwid(awid);
    if (!subjectmanInstance) {
      throw new notExistError();
    }
    if (subjectmanInstance.state === STATE_CLOSED) {
      throw new closedStateError(
        {},
        {
          state: subjectmanInstance.state,
          expectedStateList: [STATE_ACTIVE, STATE_UNDER_CONSTRUCTION],
        }
      );
    }
    return subjectmanInstance;
  }

}

module.exports = new SubjectmanMainAbl();
