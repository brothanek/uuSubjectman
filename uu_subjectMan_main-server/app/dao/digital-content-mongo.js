"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class digitalContentMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
    await super.createIndex({ awid: 1 , contentName: 1, contentType: 1 }, { unique: true });
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

  async getByIds(awid, ids) {
    const filter = {
      awid: awid,
      _id: {
        $in: ids.map((id) => {
          if (!ObjectId.isValid(id)) return id;
          return new ObjectId(id);
        }),
      },
    };
    return await super.find(filter);
  }

  async list(uuObject) {
    const sort = { [uuObject.sortBy]: uuObject.order === "asc" ? 1 : -1 };
    return await super.find( { awid: uuObject.awid }, uuObject.pageInfo, sort);
  }

  async delete(uuObject) {
    await super.deleteOne(uuObject);
  }
}

module.exports = digitalContentMongo;
