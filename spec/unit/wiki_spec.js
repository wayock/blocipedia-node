const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("Wiki", () => {

   beforeEach((done) => {
     this.user;
     this.wiki;

     sequelize.sync({force: true}).then((res) => {

       User.create({
         username: "captian",
         email: "starman@tesla.com",
         password: "Trekkie4lyfe",
         role: 0

       })
       .then((user) => {
         this.user = user; //store the user

         Wiki.create({
           title: "Expeditions to Alpha Centauri",
           body: "A compilation of reports from recent visits to the star system.",
           private: false,
           userId: user.id

         })
         .then((wiki) => {
           this.wiki = wiki; //store the wiki
           done();
         })
       })
     });
   });

   describe("#create()", () => {

     it("should create a wiki object with a title, body, and assigned user", (done) => {
//#1
       Wiki.create({
         title: "Pros of Cryosleep during the long journey",
         body: "1. Not having to answer the 'are we there yet?' question.",
         userId: this.user.id,
       })
       .then((wiki) => {

//#2
         expect(wiki.title).toBe("Pros of Cryosleep during the long journey");
         expect(wiki.body).toBe("1. Not having to answer the 'are we there yet?' question.");
         expect(wiki.userId).toBe(this.user.id);
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

     it("should not create a wiki with missing title, body", (done) => {
       Wiki.create({
         title: "Pros of Cryosleep during the long journey"
       })
       .then((wiki) => {
        // the code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Wiki.body cannot be null");
         done();
       })
     });

   });

   describe("#setUser()", () => {

        it("should associate a wiki and a user together", (done) => {

          User.create({
            username: "adaexample",
            email: "ada@example.com",
            password: "password",
            role: 0
          })
          .then((newUser) => {

            expect(this.wiki.userId).toBe(this.user.id);

            this.wiki.setUser(newUser)
            .then((wiki) => {

              expect(this.wiki.userId).toBe(newUser.id);
              done();

            });
          })
        });

      });

    describe("#getUser()", () => {

      it("should return the associated user", (done) => {

        this.wiki.getUser()
        .then((associatedUser) => {
          expect(associatedUser.email).toBe("starman@tesla.com");
          done();
        });

      });

    });

});
