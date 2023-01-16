import chai from "chai";
import chaiHttp from "chai-http";

import { TEST_API } from "../constants";
import { TEST_USERS } from "../testData";
import { TTestData } from "../types";

chai.should();
chai.use(chaiHttp);

const CRUD = async () => {
  const testUser = TEST_USERS[0] as TTestData;
  const testUser2 = TEST_USERS[1] as TTestData;

  let newUserId: number = 1;

  it("Get users", (done) => {
    chai
      .request(TEST_API)
      .get("/users")
      .end((_err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.be.a("array");

        newUserId = res.body.length + 1;
        done();
      });
  });

  it("Add new user", (done) => {
    chai
      .request(TEST_API)
      .post("/users")
      .set("content-type", "application/json")
      .send(testUser)
      .end((_err: any, res: any) => {
        res.should.have.status(201);
        res.body.should.to.deep.include(testUser);

        done();
      });
  });

  it("Update User", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/${newUserId}`)
      .set("content-type", "application/json")
      .send(testUser2)
      .end((_err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.to.deep.include(testUser2);

        done();
      });
  });

  it("Delete User", (done) => {
    chai
      .request(TEST_API)
      .delete(`/users/${newUserId}`)
      .end((_err: any, res: any) => {
        res.should.have.status(204);

        done();
      });
  });

  it("Get User", (done) => {
    chai
      .request(TEST_API)
      .get(`/users/${newUserId}`)
      .end((_err: any, res: any) => {
        res.should.have.status(404);

        done();
      });
  });
};

export default CRUD;
