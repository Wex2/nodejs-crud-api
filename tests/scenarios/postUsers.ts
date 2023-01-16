import chai from "chai";
import chaiHttp from "chai-http";

import { TEST_API } from "../constants";
import { TEST_USERS } from "../testData";
import { TTestData } from "../types";

chai.should();
chai.use(chaiHttp);

const Post = async () => {
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

  it("POST /users -> STATUS 201 and created record", (done) => {
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

  it("GET /users/[user_id] -> STATUS 200 and created user", (done) => {
    chai
      .request(TEST_API)
      .get(`/users/${numUser}`)
      .end((_err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.to.deep.include(testUser);

        done();
      });
  });

  it("POST /users (body without required fields) -> STATUS 400 and error message", (done) => {
    chai
      .request(TEST_API)
      .post("/users")
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
};

export default Post;
