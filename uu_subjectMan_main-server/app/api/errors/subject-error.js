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

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
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
  SubjectDaoGetFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectDaoGetFailed`;
      this.message = "Get subject by subject DAO get failed.";
    }
  }
};

const Remove = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}remove/`,
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
  SubjectDaoDeleteFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}subjectDaoDeleteFailed`;
      this.message = "Delete subject by subject DAO delete failed.";
    }
  },
  SubjectDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  }
};

const Edit = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}edit/`,
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
  SubjectDaoUpdateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Edit subject by subject DAO update failed.";
    }
  },
  SubjectDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  }
};

module.exports = {
  Edit,
  Remove,
  Get,
  Create
};
