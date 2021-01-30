"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/digital-content-error.js");
const SubjectmanAbl =  require("./subjectman-main-abl");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  editUnsupportedKeys: {
    code: `${Errors.Edit.UC_CODE}unsupportedKeys`,
  }
};

class DigitalContentAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("digitalContent");
  }

  async edit(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Edit.SubjectmanInstanceDoesNotExist,
      Errors.Edit.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("digitalContentEditDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );
    //TODO update object in uuBT

    let digitalContentExist = await this.dao.get({id: dtoIn.id, awid: awid});
    if  (!digitalContentExist) throw new Errors.Edit.DigitalContentDoesNotExist({ uuAppErrorMap }, {id: dtoIn.id} )

    let digitalContent;
    dtoIn.awid = awid;

    try {
      digitalContent = await this.dao.update(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Edit.digitalContentDaoEditFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 8
    digitalContent.uuAppErrorMap = uuAppErrorMap;
    return digitalContent;
  }

  async get(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Get.SubjectmanInstanceDoesNotExist,
      Errors.Get.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("digitalContentGetDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    //TODO create object in uuBT

    // HDS 3
    dtoIn.awid = awid;

    let digitalContent = await this.dao.get(dtoIn);
    if (!digitalContent) {
      // A6
      throw new Errors.Get.DigitalContentDaoGetFailed(uuAppErrorMap, { digitalContentId: dtoIn.id });
    }

    // HDS 4
    digitalContent.uuAppErrorMap = uuAppErrorMap;
    return digitalContent;
  }

  async create(awid, dtoIn) {
    // HDS 1
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Create.SubjectmanInstanceDoesNotExist,
      Errors.Create.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("digitalContentCreateDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    //TODO update object in uuBT


    let digitalContent;
    dtoIn.awid = awid;

    try {
      digitalContent = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.digitalContentDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 8
    digitalContent.uuAppErrorMap = uuAppErrorMap;
    return digitalContent;
  }

}

module.exports = new DigitalContentAbl();
