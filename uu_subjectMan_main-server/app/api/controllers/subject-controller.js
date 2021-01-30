"use strict";
const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {

  create(ucEnv) {
    return SubjectAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SubjectController();
