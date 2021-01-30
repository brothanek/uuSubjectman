"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class digitalContentMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
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
    let filter = { awid: uuObject.awid };
    if (uuObject.filterMap) filter = { ...filter, ...uuObject.filterMap };
    return await super.find(filter, uuObject.pageInfo, sort);
  }

  async delete(uuObject) {
    await super.deleteOne(uuObject);
  }
}

module.exports = digitalContentMongo;
