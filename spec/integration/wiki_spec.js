const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis";

const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("routes : wikis", () => {

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
         this.user = user;
         request.get({
            url: "http://localhost:3000/auth/fake",
            form: {
              id: user.id,
              username: user.name,
              email: user.email,
              role: user.role
            }
          });
         Wiki.create({
           title: "Winter Games",
           body: "Post your Winter Games stories.",
           userId: this.user.id
         })
         .then((wiki) => {
           //console.log(wiki);
           this.wiki = wiki;
           done();
         })
         .catch((err) => {
                    console.log(err);
                    done();
         });
       })
     });

   });

  describe("GET /wikis", () => {

        it("should return a status code 200 and all wikis", (done) => {
            request.get(base, (err,res,body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Wikis");
                expect(body).toContain("Winter Games");
                done();
            });
        });
    });


  describe("GET /wikis/new", () => {

    it("should render a new wiki form", (done) => {
      request.get(`${base}/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Wiki");
        done();
      });
    });

  });


  describe("POST /wikis/create", () => {

   it("should create a new wiki and redirect", (done) => {
      const options = {
        url: `${base}/create`,
        form: {
          title: "Watching snow melt",
          body: "Without a doubt my favoriting things to do besides watching paint dry!",
          private: false,
          userId: this.user.id
        }
      };
      request.post(options,
        (err, res, body) => {
          Wiki.findOne({where: {title: "Watching snow melt"}})
          .then((wiki) => {
            expect(res.statusCode).toBe(303);
            expect(wiki.title).toBe("Watching snow melt");
            expect(wiki.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
     });
   });

  /*   it("should not create a new post that fails validations", (done) => {
            const options = {
              url: `${base}/${this.topic.id}/posts/create`,
              form: {

     //#1
                title: "a",
                body: "b"
              }
            };

            request.post(options,
              (err, res, body) => {

     //#2
                Post.findOne({where: {title: "a"}})
                .then((post) => {
                    expect(post).toBeNull();
                    done();
                })
                .catch((err) => {
                  console.log(err);
                  done();
                });
              }
            );
          });

   });
*/
   describe("GET wikis/:id", () => {

       it("should render a view with the selected wiki", (done) => {
         request.get(`${base}/${this.wiki.id}`, (err, res, body) => {
           expect(err).toBeNull();
           expect(body).toContain("Post your Winter Games stories.");
           done();
         });
       });

     });

    describe("POST /wikis/:id/destroy", () => {

      it("should delete the wiki with the associated ID", (done) => {
   //#1
        Wiki.findAll().then(wikis => {
          expect(wikis[0].id).toBe(1);
          request.post(`${base}/${this.wiki.id}/destroy`, (err, res, body) => {
   //#2
             Wiki.findByPk(1)
             .then((wiki) => {
               expect(err).toBeNull();
               expect(wiki).toBeNull();
               done();
             })
           });
         });
      });

    });


    describe("GET /wikis/:id/edit", () => {

         it("should render a view with an edit wiki form", (done) => {
           request.get(`${base}/${this.wiki.id}/edit`, (err, res, body) => {
             expect(err).toBeNull();
             expect(body).toContain("Edit Wiki");
             expect(body).toContain("Post your Winter Games stories.");
             done();
           });
         });

    });

    describe("POST /wikis/:id/update", () => {

         it("should return a status code 302", (done) => {
           request.post({
             url: `${base}/${this.wiki.id}/update`,
             form: {
               title: "Snowman Building Competition",
               body: "I love watching them melt slowly.",
               userId: this.user.id
             }
           }, (err, res, body) => {
             expect(res.statusCode).toBe(302);
             done();
           });
         });

         it("should update the wiki with the given values", (done) => {
             const options = {
               url: `${base}/${this.wiki.id}/update`,
               form: {
                 title: "Snowman Building Competition",
                 body: "I really enjoy the funny hats on them."
               }
             };
             request.post(options,
               (err, res, body) => {

               expect(err).toBeNull();

               Wiki.findOne({
                 where: {id: this.wiki.id}
               })
               .then((wiki) => {
                 expect(wiki.title).toBe("Snowman Building Competition");
                 done();
               });
             });
         });

     });
  });
