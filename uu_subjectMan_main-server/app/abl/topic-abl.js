"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");
const SubjectmanAbl =  require("./subjectman-main-abl");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  }
};

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
  }

  async get(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Get.SubjectmanInstanceDoesNotExist,
      Errors.Get.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("topicGetDtoInType", dtoIn);
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

    let topic = await this.dao.get(dtoIn);
    if (!topic) {
      // A6
      throw new Errors.Get.TopicDaoGetFailed(uuAppErrorMap, { topicId: dtoIn.id });
    }

    // HDS 4
    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
  }

  async create(awid, dtoIn) {
    // HDS 1
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Create.SubjectmanInstanceDoesNotExist,
      Errors.Create.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    //TODO update object in uuBT


    let topic;
    dtoIn.awid = awid;

    try {
      topic = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.topicDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 8
    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
  }

}

module.exports = new TopicAbl();
