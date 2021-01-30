"use strict";
const DigitalContentAbl = require("../../abl/digital-content-abl");

class DigitalContentController {

  get(ucEnv) {
    return DigitalContentAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return DigitalContentAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}
module.exports = new DigitalContentController();
