import chai from "chai";
import chaiHttp from "chai-http";

import { TEST_API } from "../constants";
import { TEST_USERS } from "../testData";
import { TTestData } from "../types";

chai.should();
chai.use(chaiHttp);

const Put = async () => {
  const testUser = TEST_USERS[0] as TTestData;

  let numUser: number = 0;

  it("GET /users -> STATUS 200 and array of users", (done) => {
    chai
      .request(TEST_API)
      .get(`/users`)
      .end((_err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.be.a("array");

        numUser = res.body.length;

        done();
      });
  });

  it("PUT /users/[user_id:number] -> STATUS 200 and updated record", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/${numUser}`)
      .set("content-type", "application/json")
      .send(testUser)
      .end((_err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.to.deep.include(testUser);

        done();
      });
  });

  it("GET /users/[user_id] -> STATUS 200 and updated user", (done) => {
    chai
      .request(TEST_API)
      .get(`/users/${numUser}`)
      .end((_err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.to.deep.include(testUser);

        done();
      });
  });

  it("PUT /users (body without required fields) -> STATUS 400 and error message", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/${numUser}`)
      .set("content-type", "application/json")
      .send({ username: testUser.username })
      .end((_err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.to.deep.include({
          message: "Body Does Not Contain Required Fields",
          statusCode: 400,
        });

        done();
      });
  });

  it("PUT /users/[user_id:not number] -> STATUS 400 and error message", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/another`)
      .set("content-type", "application/json")
      .end((_err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.to.deep.include({
          message: "Incorrect UserId",
          statusCode: 400,
        });

        done();
      });
  });

  it("PUT /users/[user_id:negative number] -> STATUS 400 and error message", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/-5`)
      .set("content-type", "application/json")
      .send(testUser)
      .end((_err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.to.deep.include({
          message: "Incorrect UserId",
          statusCode: 400,
        });

        done();
      });
  });

  it("PUT /users/[user_id:float number] -> STATUS 400 and error message", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/0.5`)
      .set("content-type", "application/json")
      .send(testUser)
      .end((_err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.to.deep.include({
          message: "Incorrect UserId",
          statusCode: 400,
        });

        done();
      });
  });

  it("PUT /users/[user_id:zero number] -> STATUS 400 and error message", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/0`)
      .set("content-type", "application/json")
      .send(testUser)
      .end((_err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.to.deep.include({
          message: "Incorrect UserId",
          statusCode: 400,
        });

        done();
      });
  });

  it("PUT /users/[user_id:infinity] -> STATUS 400 and error message", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/infinity`)
      .set("content-type", "application/json")
      .send(testUser)
      .end((_err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.to.deep.include({
          message: "Incorrect UserId",
          statusCode: 400,
        });

        done();
      });
  });

  it("PUT /users/[user_id:very large number(user does not exist)] -> STATUS 404 and error message", (done) => {
    chai
      .request(TEST_API)
      .put(`/users/99999999`)
      .set("content-type", "application/json")
      .send(testUser)
      .end((_err: any, res: any) => {
        res.should.have.status(404);
        res.body.should.to.deep.include({
          message: "User Does Not Exist",
          statusCode: 404,
        });

        done();
      });
  });
};

export default Put;
