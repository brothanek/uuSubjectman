"use strict";

const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {
  static create(ucEnv) {
    return SubjectAbl.create(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static get(ucEnv) {
    return SubjectAbl.get(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }
}

module.exports = SubjectController;
