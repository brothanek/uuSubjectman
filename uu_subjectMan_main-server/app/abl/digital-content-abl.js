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
  },
  removeUnsupportedKeys: {
    code: `${Errors.Edit.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  }
};

const DEFAULTS = {
  list: {
    sortBy: "contentName",
    order: "asc",
    pageIndex: 0,
    pageSize: 100,
  }
};

class DigitalContentAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("digitalContent");
    this.daoTopic = DaoFactory.getDao("topic");
  }

  async list(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.List.SubjectmanInstanceDoesNotExist,
      Errors.List.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("digitalContentListDtoInType", dtoIn);
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

    let digitalContent = await this.dao.list(dtoIn);

    // HDS 4
    digitalContent.uuAppErrorMap = uuAppErrorMap;
    return digitalContent;
  }

  async remove(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Remove.SubjectmanInstanceDoesNotExist,
      Errors.Remove.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("digitalContentRemoveDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeUnsupportedKeys.code,
      Errors.Remove.InvalidDtoIn
    );
    //TODO update object in uuBT

    let digitalContentExist = await this.dao.get({id: dtoIn.id, awid: awid});
    if  (!digitalContentExist) throw new Errors.Remove.DigitalContentDoesNotExist({ uuAppErrorMap }, {id: dtoIn.id} )

    dtoIn.awid = awid;

    let topics = await this.daoTopic.listByContent(dtoIn);
    if (topics.itemList.length > 0) {
      topics = topics.itemList.map( topic => {
        return {
          topicId: topic.id,
          topicName: topic.topicName
        }
      } )
      throw new Errors.Remove.DigitalContentHasTopics({uuAppErrorMap}, { digitalContentId: dtoIn.id, topics })
    }

     try {
      await this.dao.delete(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Remove.DigitalContentDaoDeleteFailed({ uuAppErrorMap }, e);
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
    let validationResult = this.validator.validate("digitalContentEditDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
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
        throw new Errors.Edit.DigitalContentDaoUpdateFailed({ uuAppErrorMap }, e);
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
