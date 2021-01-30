"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");
const { DbConnection } = require("uu_appg01_datastore");

class SubjectMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, topicIdList: 1 });
    await super.createIndex({ awid: 1, topicIdList: 1 });
    await super.createIndex({ awid: 1, topicIdList: 1 });
  }

  async create(uuObject) {
    if (uuObject.topicIdList) {
      uuObject.topicIdList = uuObject.topicIdList.map(topicId => new ObjectId(topicId));
     }
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }
}

module.exports = SubjectMongo;
