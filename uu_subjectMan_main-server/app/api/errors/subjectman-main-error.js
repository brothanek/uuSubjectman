"use strict";
const SubjectmanUseCaseError = require("./subjectman-main-use-case-error.js");

const Init = {
  UC_CODE: `${SubjectmanUseCaseError.ERROR_PREFIX}init/`,

  SubjectmanInstanceAlreadyInitialized: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}subjectManInstanceAlreadyInitialized`;
      this.message = "Subjectman is already initialized.";
    }
  },

  InvalidDtoIn: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
  SubjectmanInstanceDaoCreateFailed: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}subjectManInstanceDaoCreateFailed`;
      this.message = "Create subjectmanInstance by subjectmanInstance DAO create failed.";
    }
  },
};

const Load = {
  UC_CODE: `${SubjectmanUseCaseError.ERROR_PREFIX}load/`,
  SubjectmanDoesNotExist: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}subjectManDoesNotExist`;
      this.message = "Subjectman does not exist.";
    }
  },
  SubjectmanNotInProperState: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}subjectManNotInProperState`;
      this.message = "Subjectman is not in proper state [active|underConstruction].";
    }
  },
  SubjectmanIsUnderConstruction: class extends SubjectmanUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}subjectManIsUnderConstruction`;
      this.message = "Subjectman is in state underConstruction.";
    }
  },
};

module.exports = {
  Init,
  Load
};
