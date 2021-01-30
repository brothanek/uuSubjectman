/*eslint-disable no-constant-condition*/

"use strict";
const { Base64 } = require("uu_appg01_server").Utils;
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const SubjectInstanceAbl = require("./subjectman-main-abl");
const Errors = require("../api/errors/subject-error");
const Path = require("path");
// const FileHelper = require("../helpers/file-helper");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  // createCategoryDoesNotExist: {
  //   code: `${Errors.Create.UC_CODE}categoryDoesNotExist`,
  //   message: "One or more categories with given categoryId do not exist."
  // },
  // updateUnsupportedKeys: {
  //   code: `${Errors.Update.UC_CODE}unsupportedKeys`
  // },
  // removeUnsupportedKeys: {
  //   code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  // },
  // listUnsupportedKeys: {
  //   code: `${Errors.List.UC_CODE}unsupportedKeys`
  // }
};
const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100
};

class SubjectAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "subject-types.js"));
    this.dao = DaoFactory.getDao("subject");
    // this.topicDao = DaoFactory.getDao("topic");
    // this.digitalContentDao = DaoFactory.getDao("digitalContent");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // -- potreba dodelat subject-man-instance abl
    // await SubjectInstanceAbl.checkInstance(
    //   awid,
    //   Errors.Create.SubjectmanInstanceDoesNotExist,
    //   Errors.Create.SubjectmanInstanceNotInProperState
    // );

    // hds
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    // hds
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // hds
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.awid = awid;

    // dodelat napojeni s topicem --
    // if (dtoIn.topicIdList) {
    //   let presentTopics = await this._checkTopicsExistence(awid, dtoIn.topicIdList);
    //
    //   if (dtoIn.topicIdList.length > 0) {
    //     ValidationHelper.addWarning(
    //       uuAppErrorMap,
    //       WARNINGS.createTopicDoesNotExist.code,
    //       WARNINGS.createTopicDoesNotExist.message,
    //       { topicIdList: [...new Set(dtoIn.topicIdList)] }
    //     );
    //   }
    //   dtoIn.topicIdList = [...new Set(presentTopics)];
    // } else {
    //   dtoIn.topicIdList = [];
    // }

    let subject;
    try {
      subject = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.SubjectDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }

  async get(awid, dtoIn, authorizationResult) {
    // -- potreba dodelat subject-man-instance cmds
    // let subjectmanInstance = await SubjectmanInstanceAbl.checkInstance(
    //   awid,
    //   Errors.Get.SubjectmanInstanceDoesNotExist,
    //   Errors.Get.SubjectmanInstanceNotInProperState
    // );


    let authorizedProfiles = authorizationResult.getAuthorizedProfiles().includes(SubjectInstanceAbl.AUTHORITIES);

    // -- potreba dodelat subject-man-instance cmds
    // if (
    //   subjectmanInstance.state === SubjectmanInstanceAbl.STATE_UNDER_CONSTRUCTION &&
    //   !authorizedProfiles.includes(SubjectmanInstanceAbl.AUTHORITIES) &&
    //   !authorizedProfiles.includes(SubjectmanInstanceAbl.EXECUTIVES)
    // ) {
    //   throw new Errors.Get.SubjectmanInstanceIsUnderConstruction({}, { state: subjectmanInstance.state });
    // }

    // hds
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    // hds
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // hds
    let subject = await this.dao.get(awid, dtoIn.id);
    if (!subject) {
      throw new Errors.Get.SubjectDoesNotExist(uuAppErrorMap, { subjectId: dtoIn.id });
    }

    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }
}

module.exports = new SubjectAbl();
