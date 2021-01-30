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
      this.code = `${Edit.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectmanInstanceDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist.";
    }
  },
  SubjectmanInstanceNotInProperState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state [active|underConstruction].";
    }
  },
  DigitalContentDaoUpdateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}digitalContentDaoUpdateFailed`;
      this.message = "Edit digitalContent by digitalContent DAO update failed.";
    }
  },
  DigitalContentDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}digitalContentDoesNotExist`;
      this.message = "Digital Content does not exist.";
    }
  },

};

const Remove = {
  UC_CODE: `${DIGITAL_CONTENT_ERROR_PREFIX}remove/`,
  InvalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectmanInstanceDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist.";
    }
  },
  SubjectmanInstanceNotInProperState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state [active|underConstruction].";
    }
  },
  DigitalContentDaoDeleteFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}digitalContentDaoDeleteFailed`;
      this.message = "Delete digitalContent by digitalContent DAO delete failed.";
    }
  },
  DigitalContentDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}digitalContentDoesNotExist`;
      this.message = "Digital Content does not exist.";
    }
  }

};

module.exports = {
  Remove,
  Edit,
  Get,
  Create
};
