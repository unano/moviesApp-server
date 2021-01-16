import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import userModel from "../../../../api/users/userModel";

const expect = chai.expect;

const sampleMovie = {
  id: 724989,
  title: "Hard Kill"
};
const sampleUpcomingMovie = {
  id: 464052,
  title: "Wonder Woman 1984"
};

const sampleTopRatedMovie = {
  id: 761053,
  title: "Gabriel's Inferno Part III"
};

const samplePersonalInfo = {
  "gender":"male",
  "birthday":"2000-01-01",
  "hobby":"sport",
  "movies":"movie1",
  "actors":"actor1",
  "introduce":"I'm who"
};
const samplePersonalInfo2 = {
  "gender":"female",
  "birthday":"2000-03-03",
  "hobby":"sport2",
  "movies":"movie3",
  "actors":"actor3",
  "introduce":"I'm who ok"
};

let db;
let api;
let token;

const users = [
  {
    username: "user1",
    password: "test1",
    userInfo:{"gender":"male",
    "birthday":"2000-01-01",
    "hobby":"sport",
    "movies":"movie1",
    "actors":"actor1",
    "introduce":"I'm who"}
  },
  {
    username: "user2",
    password: "test2",
    userInfo:{"gender":"male",
    "birthday":"2000-01-01",
    "hobby":"sport",
    "movies":"movie2",
    "actors":"actor2",
    "introduce":"I'm good"}
  },
];

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    return request(api)
        .post("/api/users")
        .send({
          username: "user1",
          password: "test1",
        })
        // .expect(200)
        .then((res) => {
          token= res.body.token;
        });

  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET / ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    describe("when the username and password is valid", () => {
      it("should return a 201 status and the confirmation message", () => {
        return request(api)
          .post("/api/users?action=register")
          .send({
            username: "user3",
            password: "test3",
          })
          .expect(201)
          .expect({ code: 201, "msg": "Successful created new user." });
      });
      after(() => {
        return request(api)
          .get("/api/users")
          .set("Authorization", token)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(3);
            let result = res.body.map((user) => user.username);
            expect(result).to.have.members(["user1", "user2", "user3"]);
          });
      });
    });
    describe("when the username is invalid", () => {
      describe("when the username length is too short", () => {
        it("should return a 500 status and the error message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "u",
              password: "test3",
            })
            .expect(500)
            .expect({ 
              "status": "error",
              "message": "User validation failed: username: Validator failed for path `username` with value `u`"
            });
        });
      });
    });

    describe("when the password is invalid", () => {
      describe("when the password length is too short", () => {
        it("should return a 400 status and the error message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "user3",
              password: "tes3",
            })
            .expect(400)
            .expect({ 
              "status": "fail",
              "message": "Password is at least 5 characters long and contain at least one number and one letter."
            });
        });
      });
      describe("when the password don't have at least one number and one letter", () => {
        it("should return a 400 status and the error message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "user3",
              password: "testaa",
            })
            .expect(400)
            .expect({ 
              "status": "fail",
              "message": "Password is at least 5 characters long and contain at least one number and one letter."
            });
        });
      });
  });
  });
  
  describe("POST / ", () => {
    describe("when the input is correct", () => {
      it("should return a 200 status and the token", () => {
        return request(api)
          .post("/api/users")
          .send({
            username: "user1",
            password: "test1",
          })
          .expect(200)
          .then((res) => {
            expect(res.body.success).to.equal(true);
            expect(res.body.token).to.be.a('string');
          });
      });
    });
    describe("when the input is incorrect", () => {
      describe("when the username input is incorrect", () => {
        it("should return a 400 status and the error message", () => {
          return request(api)
            .post("/api/users")
            .send({
              username: "user",
              password: "test1",
            })
            .expect(400)
            .expect({ 
              "status": "fail",
              "message": "Authentication failed. User not found."
            });
        });
      });
      describe("when the password input is incorrect", () => {
        it("should return a 400 status and the error message", () => {
          return request(api)
            .post("/api/users")
            .send({
              username: "user1",
              password: "test",
            })
            .expect(400)
            .expect({ 
              "status": "fail",
              "message": "Authentication failed. Wrong password."
            });
        });
      });
    });
  });


//favourites
  describe("GET /:userName/favourites ", () => {
    it("should return 0 movie and a status 200", (done) => {
      request(api)
        .get("/api/users/user1/favourites")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(0);
          let result = res.body.map((movie) => movie.id);
          expect(result).to.have.members([]);
          done();
        });
    });
  });

  describe("POST /:userName/favourites ", () => {
    describe("when the movie id exists", () => {
      it("should return the saved movie id and a 201 status", () => {
        return request(api)
          .post("/api/users/user1/favourites")
          .set("Authorization", token)
          .send({id:sampleMovie.id})
          .expect(201)
          .then((res) => {
            expect(res.body.favourites).to.be.a("array");
            expect(res.body.favourites.length).to.equal(1);
          });
      });
      after(() => {
        return request(api)
          .get("/api/users/user1/favourites")
          .set("Authorization", token)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(1);
            let result = res.body.map((movie) => movie.id);
            expect(result).to.have.members([724989]);
          });
      });
    });
    describe("when the movie id doesn't exist", () => {
      it("should return a 400 status and a error message", () => {
        return request(api)
          .post("/api/users/user1/favourites")
          .set("Authorization", token)
          .send({id:9999})
          .expect(400)
          .expect({ 
            "status": "fail",
            "message":"Movie not found."
          });
      });
    });
    
});


//watchlist
  describe("GET /:userName/watchList ", () => {
    it("should return 0 movie and a status 200", (done) => {
      request(api)
        .get("/api/users/user1/watchList")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(0);
          let result = res.body.map((movie) => movie.id);
          expect(result).to.have.members([]);
          done();
        });
    });
  });

  describe("POST /:userName/watchList ", () => {
    describe("when the movie id exists", () => {
      it("should return the saved movie id and a 201 status", () => {
        return request(api)
          .post("/api/users/user1/watchList")
          .set("Authorization", token)
          .send({id:sampleUpcomingMovie.id})
          .expect(201)
          .then((res) => {
            expect(res.body.watchList).to.be.a("array");
            expect(res.body.watchList.length).to.equal(1);
          });
      });
      after(() => {
        return request(api)
          .get("/api/users/user1/watchList")
          .set("Authorization", token)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(1);
            let result = res.body.map((movie) => movie.id);
            expect(result).to.have.members([464052]);
          });
      });
    });
    describe("when the movie id doesn't exist", () => {
      it("should return a 400 status and a error message", () => {
        return request(api)
          .post("/api/users/user1/watchList")
          .set("Authorization", token)
          .send({id:9999})
          .expect(400)
          .expect({ 
            "status": "fail",
            "message": "Movie not found."
          });
      });
    });
  });


  //collections
  describe("GET /:userName/collections ", () => {
    it("should return 0 movie and a status 200", (done) => {
      request(api)
        .get("/api/users/user1/collections")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(0);
          let result = res.body.map((movie) => movie.id);
          expect(result).to.have.members([]);
          done();
        });
    });
  });

  describe("POST /:userName/collections ", () => {
    describe("when the movie id exists", () => {
      it("should return the saved movie id and a 201 status", () => {
        return request(api)
          .post("/api/users/user1/collections")
          .set("Authorization", token)
          .send({id:sampleTopRatedMovie.id})
          .expect(201)
          .then((res) => {
            expect(res.body.collections).to.be.a("array");
            expect(res.body.collections.length).to.equal(1);
          });
      });
      after(() => {
        return request(api)
          .get("/api/users/user1/collections")
          .set("Authorization", token)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(1);
            let result = res.body.map((movie) => movie.id);
            expect(result).to.have.members([761053]);
          });
      });
    });
    describe("when the movie id doesn't exist", () => {
      it("should return a 400 status and a error message", () => {
        return request(api)
          .post("/api/users/user1/collections")
          .set("Authorization", token)
          .send({id:9999})
          .expect(400)
          .expect({ 
            "status": "fail",
            "message": "Movie not found."
          });
      });
    });
  });

  //userInfo
  describe("GET /:userName/userInfo ", () => {
    it("should return a status 200 and user information", (done) => {
      request(api)
        .get("/api/users/user1/userInfo")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.gender).to.equal(samplePersonalInfo.gender);
          expect(res.body.birthday).to.equal(samplePersonalInfo.birthday);
          expect(res.body.hobby).to.equal(samplePersonalInfo.hobby);
          expect(res.body.movies).to.equal(samplePersonalInfo.movies);
          expect(res.body.actors).to.equal(samplePersonalInfo.actors);
          expect(res.body.introduce).to.equal(samplePersonalInfo.introduce);
          done();
        });
    });
  });

  describe("PUT /:userName/userInfo ", () => {
    describe("when the iserInfo input is correct", () => {
      it("should return status 200 and the updated user information", (done) => {
        request(api)
          .put("/api/users/user1/userInfo")
          .set("Authorization", token)
          .send({
            gender:"female",
            birthday:"2000-03-03",
            hobby:"sport2",
            movies:"movie3",
            actors:"actor3",
            introduce:"I'm who ok"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.userInfo.gender).to.equal(samplePersonalInfo2.gender);
            expect(res.body.userInfo.birthday).to.equal(samplePersonalInfo2.birthday);
            expect(res.body.userInfo.hobby).to.equal(samplePersonalInfo2.hobby);
            expect(res.body.userInfo.movies).to.equal(samplePersonalInfo2.movies);
            expect(res.body.userInfo.actors).to.equal(samplePersonalInfo2.actors);
            expect(res.body.userInfo.introduce).to.equal(samplePersonalInfo2.introduce);
            done();
          });
      });
    });
    describe("when the userInfo input is incorrect", () => {
      it("should return status 400 and the error message", () => {
        return request(api)
        .put("/api/users/user1/userInfo")
        .set("Authorization", token)
        .send({
          birthday:"2000-03-03",
          hobby:"sport2",
          movies:"movie3",
          actors:"actor3",
          introduce:"I'm who ok"
        })
        .expect(400)
          .expect({ 
            "status": "fail",
            "message": "Lack userInfo propoerty"
          });
        });
    });
  });
});


