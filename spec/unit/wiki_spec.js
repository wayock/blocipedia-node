const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("Topic", () => {

   beforeEach((done) => {
     this.user;
     this.wiki;

     sequelize.sync({force: true}).then((res) => {

       User.create({
         username: "captian",
         email: "starman@tesla.com",
         password: "Trekkie4lyfe",
         role: "member"

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
});
