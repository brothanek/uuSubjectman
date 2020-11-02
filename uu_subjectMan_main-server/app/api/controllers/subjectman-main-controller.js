"use strict";
const SubjectManMainAbl = require("../../abl/subjectman-main-abl.js");

class SubjectManMainController {
  init(ucEnv) {
    return SubjectManMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubjectManMainController();
