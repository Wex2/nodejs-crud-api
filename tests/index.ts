import chaiHttp from "chai-http";
import chai from "chai";

import CRUD from "./scenarios/crud";
import Delete from "./scenarios/deleteUsers";
import Get from "./scenarios/getUsers";
import Post from "./scenarios/postUsers";
import Put from "./scenarios/putUsers";

chai.should();
chai.use(chaiHttp);

describe("Scenarios", () => {
  describe("Check CRUD api", CRUD);
  describe("Check GET", Get);
  describe("Check POST", Post);
  describe("Check PUT", Put);
  describe("Check DELETE", Delete);
});
