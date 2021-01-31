"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class subjectMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1, degree: 1, language: 1 }, { unique: true });
    await super.createIndex({ awid: 1 , degree: 1 });
    await super.createIndex({ awid: 1 , language: 1 });

  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    let filter = { awid: uuObject.awid, id: uuObject.id };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async getByAwid(awid) {
    return await super.findOne({ awid: awid });
  }

  async get(uuObject) {
    return await super.findOne(uuObject);
  }

  async list(uuObject) {
    const sort = { [uuObject.sortBy]: uuObject.order === "asc" ? 1 : -1 };
    return await super.find( { awid: uuObject.awid }, uuObject.pageInfo, sort);
  }

  async listByTopic(uuObject) {
    return await super.find( { awid: uuObject.awid, topicIdList: uuObject.id });
  }

  async delete(uuObject) {
    await super.deleteOne(uuObject);
  }
}

module.exports = subjectMongo;
