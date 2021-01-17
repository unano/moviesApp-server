import chai from "chai";
import request from "supertest";
import peopleModel from "../../../../api/people/peopleModel";
import {people} from '../../../../seedData/people.js';

const expect = chai.expect;

let api;

const samplePerson = {
  id: 90633,
  name: "Gal Gadot",
};

describe("People endpoint", () => {
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await peopleModel.deleteMany();
      await people.forEach(user => peopleModel.create(user));
    } catch (err) {
      console.error(`failed to Load people Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /people ", () => {
    it("should return 20 peoples and a status 200", () => {
      return request(api)
        .get("/api/people")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
        });
    });
  });

  describe("GET /people/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching person", () => {
        return request(api)
          .get(`/api/people/${samplePerson.id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("name", samplePerson.name);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/people/xxx")
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

  describe("GET /people/:id/movies", () => {
  it("should return 20 upcoming movies and a status 200", () => {
    return request(api)
      .get(`/api/people/${samplePerson.id}/movies`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("object");
      });
  });
});
});
