"use strict";

const SubjectmanMainUseCaseError = require("./subjectman-main-use-case-error.js");
const DIGITAL_CONTENT_ERROR_PREFIX = `${SubjectmanMainUseCaseError.ERROR_PREFIX}digitalContent/`;

const Get = {
  UC_CODE: `${DIGITAL_CONTENT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectmanInstanceDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist.";
    }
  },
  SubjectmanInstanceNotInProperState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state [active|underConstruction].";
    }
  },
  DigitalContentDaoGetFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}digitalContentDaoGetFailed`;
      this.message = "Get digitalContent by digitalContent DAO get failed.";
    }
  },
};

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

const Edit = {
  UC_CODE: `${DIGITAL_CONTENT_ERROR_PREFIX}edit/`,
  InvalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectmanInstanceDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist.";
    }
  },
  SubjectmanInstanceNotInProperState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state [active|underConstruction].";
    }
  },
  DigitalContentDaoEditFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}digitalContentDaoEditFailed`;
      this.message = "Get digitalContent by digitalContent DAO edit failed.";
    }
  },
  DigitalContentDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}digitalContentDoesNotExist`;
      this.message = "Digital Content does not exist.";
    }
  },

};

module.exports = {
  Edit,
  Get,
  Create
};
