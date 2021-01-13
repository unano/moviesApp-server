import chai from "chai";
import request from "supertest";
import userModel from "../../../../api/users/userModel";
import movieModel from "../../../../api/movies/movieModel";
import topRatedmovieModel from '../../../../api/movies/topRatedMovieModel';
import upcomingmovieModel from '../../../../api/movies/upcomingMovieModel';
import {movies} from '../../../../seedData/movies.js';
import {topRated} from '../../../../seedData/topRated.js';
import {upcoming} from '../../../../seedData/upcoming.js';

const expect = chai.expect;

let api;
let token;

const sampleMovie = {
  id: 337401,
  title: "Mulan",
};

const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

describe("Movies endpoint", () => {
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
    } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
    }
    try {
      await topRatedmovieModel.deleteMany();
      await topRatedmovieModel.collection.insertMany(topRated);
      console.info(`${topRated.length} TopRated Movies were successfully stored.`);
      } catch (err) {
      console.error(`failed to Load movie Data: ${err}`);
      }
    try {
      await upcomingmovieModel.deleteMany();
      await upcomingmovieModel.collection.insertMany(upcoming);
      console.info(`${upcoming.length} Upcoming Movies were successfully stored.`);
      } catch (err) {
      console.error(`failed to Load movie Data: ${err}`);
      }
    return request(api)
        .post("/api/users")
        .send({
          username: "user1",
          password: "test1",
        })
        .expect(200)
        .then((res) => {
          token= res.body.token;
        });
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /movies ", () => {
    it("should return 20 movies and a status 200", () => {
      return request(api)
        .get("/api/movies")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
        });
    });
  });

  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Authorization", token)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/movies/xxx")
          .set("Authorization", token)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect({
            "status_code": 34,
            "status_message": "The resource you requested could not be found.",
            "success": false
            });
      });
    });
  });

  describe("GET /movies/upcoming", () => {
  it("should return 20 upcoming movies and a status 200", () => {
    return request(api)
      .get("/api/movies/upcoming")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(20);
      });
  });
});

  describe("GET /movies/topRated", () => {
    it("should return 20 topRated movies and a status 200", () => {
      return request(api)
        .get("/api/movies/topRated")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
        });
    });
  });
  describe("GET /movies/:id/reviews ", () => {
    it("should return movie reviews and a status 200", () => {
      return request(api)
        .get(`/api/movies/${sampleMovie.id}/reviews`)
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
        });
    });
  });

  describe("GET /movies/:id/similar ", () => {
    it("should return similar movies and a status 200", () => {
      return request(api)
        .get(`/api/movies/${sampleMovie.id}/similar`)
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("object");
        });
    });
  });
});
