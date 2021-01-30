"use strict";

const SubjectmanMainUseCaseError = require("./subjectman-main-use-case-error.js");
const DIGITAL_CONTENT_ERROR_PREFIX = `${SubjectmanMainUseCaseError.ERROR_PREFIX}digitalContent/`;

const Create = {
  UC_CODE: `${DIGITAL_CONTENT_ERROR_PREFIX}create/`,

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
  digitalContentDaoCreateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}digitalContentDaoCreateFailed`;
      this.message = "Create digitalContent by digitalContent DAO create failed.";
    }
  }

};

module.exports = {
  Create
};
