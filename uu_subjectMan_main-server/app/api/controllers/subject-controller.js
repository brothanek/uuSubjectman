"use strict";
const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {

  remove(ucEnv) {
    return SubjectAbl.remove(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return SubjectAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return SubjectAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SubjectController();
