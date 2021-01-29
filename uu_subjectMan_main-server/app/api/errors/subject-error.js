const UuSubjectmanError = require("./uu-subject-error");

const Create = {
  UC_CODE: `${UuSubjectmanError.ERROR_PREFIX}subject/create`,

  InvalidDtoIn: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectmanInstanceDoesNotExist: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectmanInstanceDoesNotExist`;
      this.message = "SubjectmanInstance does not exist.";
    }
  },
  SubjectmanInstanceNotInProperState: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectmanInstanceNotInProperState`;
      this.message = "SubjectmanInstance is not in proper state [active|underConstruction].";
    }
  },
  SubjectDaoCreateFailed: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Create subject by subject DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${UuSubjectmanError.ERROR_PREFIX}subject/get`,
  SubjectmanInstanceDoesNotExist: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectmanInstanceDoesNotExist`;
      this.message = "SubjectmanInstance does not exist.";
    }
  },
  SubjectmanInstanceNotInProperState: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectmanInstanceNotInProperState`;
      this.message = "SubjectmanInstance is not in proper state [active|underConstruction].";
    }
  },
  SubjectmanInstanceIsUnderConstruction: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectmanInstanceIsUnderConstruction`;
      this.message = "SubjectmanInstance is in underConstruction state.";
    }
  },
  InvalidDtoIn: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDoesNotExist: class extends UuSubjectmanError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  }
};

module.exports = {
  Create,
  Get
};
