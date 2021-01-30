const path = require("path");
const fs = require("fs");
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const SUBJECTMAN_INSTANCE_INIT = "subjectmanInstance/init";
const SUBJECT_CREATE = "subject/create";

const mockDaoFactory = () => {
  // this mock ensures that all of the abl can be required
  jest.spyOn(DaoFactory, "getDao").mockImplementation(() => {
    let dao = {};
    dao.createSchema = () => {};
    return dao;
  });
};

const getSessionMock = uuIdentity => {
  let identity = {
    getUuIdentity: () => uuIdentity,
    getName: () => {}
  };
  return {
    getIdentity: () => identity
  };
};

const getAuthzResultMock = () => {
  return {
    getAuthorizedProfiles: () => []
  };
};

module.exports = {
  SUBJECTMAN_INSTANCE_INIT,
  SUBJECT_CREATE,
  mockDaoFactory,
  getSessionMock,
  getAuthzResultMock
};
