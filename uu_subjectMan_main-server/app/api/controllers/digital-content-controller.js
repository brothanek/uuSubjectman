"use strict";
const DigitalContentAbl = require("../../abl/digital-content-abl");

class DigitalContentController {

  list(ucEnv) {
    return DigitalContentAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  remove(ucEnv) {
    return DigitalContentAbl.remove(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  edit(ucEnv) {
    return DigitalContentAbl.edit(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return DigitalContentAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return DigitalContentAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}
module.exports = new DigitalContentController();
