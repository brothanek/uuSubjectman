"use strict";
const TopicAbl = require("../../abl/topic-abl.js");

class TopicController {

  list(ucEnv) {
    return TopicAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  remove(ucEnv) {
    return TopicAbl.remove(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  edit(ucEnv) {
    return TopicAbl.edit(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return TopicAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return TopicAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new TopicController();
