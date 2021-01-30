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
