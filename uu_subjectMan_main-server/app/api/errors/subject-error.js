"use strict";

const SubjectmanMainUseCaseError = require("./subjectman-main-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectmanMainUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SubjectmanInstanceDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist.";
    }
  },
  SubjectmanInstanceNotInProperState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  subjectDaoCreateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Create subject by subject DAO create failed.";
    }
  }
};

module.exports = {
  Create
};
