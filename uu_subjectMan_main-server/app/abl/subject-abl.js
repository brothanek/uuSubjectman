"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");
const SubjectmanAbl =  require("./subjectman-main-abl");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  removeUnsupportedKeys: {
    code: `${Errors.Remove.UC_CODE}unsupportedKeys`,
  }
};

const DEFAULTS = {
  list: {
    sortBy: "topicName",
    order: "asc",
    pageIndex: 0,
    pageSize: 100,
  }
};

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
  }

  async remove(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Remove.SubjectmanInstanceDoesNotExist,
      Errors.Remove.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectRemoveDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeUnsupportedKeys.code,
      Errors.Remove.InvalidDtoIn
    );
    //TODO update object in uuBT

    let subjectExist = await this.dao.get({id: dtoIn.id, awid: awid});
    if  (!subjectExist) throw new Errors.Remove.SubjectDoesNotExist({ uuAppErrorMap }, {id: dtoIn.id} )

    let topic;
    dtoIn.awid = awid;

    try {
      topic = await this.dao.delete(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Remove.TopicDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS
    return { uuAppErrorMap };
  }

  async get(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Get.SubjectmanInstanceDoesNotExist,
      Errors.Get.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
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

    let subject = await this.dao.get(dtoIn);
    if (!subject) {
      // A6
      throw new Errors.Get.SubjectDaoGetFailed(uuAppErrorMap, { subjectId: dtoIn.id });
    }

    // HDS 4
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;

  }

  async create(awid, dtoIn) {
    // HDS 1
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Create.SubjectmanInstanceDoesNotExist,
      Errors.Create.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    //TODO update object in uuBT


    let subject;
    dtoIn.awid = awid;

    try {
      subject = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.subjectDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 8
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }

}

module.exports = new SubjectAbl();
