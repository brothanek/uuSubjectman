"use strict";
const SubjectmanMainAbl = require("../../abl/subjectman-main-abl.js");

class SubjectmanMainController {
  init(ucEnv) {
    return SubjectmanMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return SubjectmanMainAbl.load(ucEnv.uri.getAwid(), ucEnv.getAuthorizationResult(), ucEnv.getSession());
  }

}

module.exports = new SubjectmanMainController();
