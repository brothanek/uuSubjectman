"use strict";
const DigitalContentAbl = require("../../abl/digital-content-abl");

class DigitalContentController {

  create(ucEnv) {
    return DigitalContentAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}
module.exports = new DigitalContentController();
