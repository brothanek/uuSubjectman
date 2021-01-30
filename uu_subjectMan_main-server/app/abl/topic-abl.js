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
  },
  editUnsupportedKeys: {
    code: `${Errors.Edit.UC_CODE}unsupportedKeys`,
  },
  removeUnsupportedKeys: {
    code: `${Errors.Remove.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
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

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
  }

  async list(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.List.SubjectmanInstanceDoesNotExist,
      Errors.List.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    //TODO create object in uuBT

    // HDS 3
    dtoIn.awid = awid;

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.list.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.list.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.list.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.list.pageIndex;

    let topic = await this.dao.list(dtoIn);

    // HDS 4
    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
  }

  async remove(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Remove.SubjectmanInstanceDoesNotExist,
      Errors.Remove.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("topicRemoveDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeUnsupportedKeys.code,
      Errors.Remove.InvalidDtoIn
    );
    //TODO update object in uuBT

    let topicExist = await this.dao.get({id: dtoIn.id, awid: awid});
    if  (!topicExist) throw new Errors.Remove.TopicDoesNotExist({ uuAppErrorMap }, {id: dtoIn.id} )

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

  async edit(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Edit.SubjectmanInstanceDoesNotExist,
      Errors.Edit.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("topicEditDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );
    //TODO update object in uuBT

    let topicExist = await this.dao.get({id: dtoIn.id, awid: awid});
    if  (!topicExist) throw new Errors.Edit.TopicDoesNotExist({ uuAppErrorMap }, {id: dtoIn.id} )

    let topic;
    dtoIn.awid = awid;

    try {
      topic = await this.dao.update(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Edit.TopicDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 8
    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
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
