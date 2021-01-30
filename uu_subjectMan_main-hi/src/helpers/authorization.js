import UU5 from "uu5g04";
import Config from "../config/config.js";

// helper class to handle basic authorization with cached values
export default class {
  constructor(userProfiles) {
    this.userProfiles = userProfiles;
    // precalculate rights ... once
    this._isInHeadMasterProfile = UU5.Common.Tools.hasProfile(this.userProfiles, Config.PROFILES.HEADMASTER);
    this._isInTeacherProfile = UU5.Common.Tools.hasProfile(this.userProfiles, Config.PROFILES.TEACHERS);
    this._isInStudentProfile = UU5.Common.Tools.hasProfile(this.userProfiles, Config.PROFILES.STUDENTS);
  }

  canManage() {
    // can manage own records
    return this._isInHeadMasterProfile || this._isInTeachersProfile;
  }

  canManageAll() {
    // can manage all records
    return this._isInHeadMasterProfile;
  }

  isStudent() {
    return Boolean(this._isInStudentsProfile);
  }

  isTeacher() {
    return Boolean(this._isInTeachersProfile);
  }
}
