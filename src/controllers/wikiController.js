const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const markdown = require( "markdown" ).markdown;

module.exports = {

  index(req, res, next){
    wikiQueries.getPublicWikis(req.user, (err, wikis) => {
      if(err){
        console.log(err);
        res.redirect(500, "static/index");
      } else {
        res.render("wikis/wiki", {wikis});
      }
    })
  },

  new(req, res, next){
      res.render("wikis/new");
   },
  create(req, res, next){
     const authorized = new Authorizer(req.user).createPrivate();
     console.log(req.body.private);
     if (authorized || req.body.private == false || req.body.private == undefined) {
       let newWiki= {
         title: req.body.title,
         body: req.body.body,
         private: req.body.private ? req.body.private : false,
         userId: req.user.id
       };

       wikiQueries.addWiki(newWiki, (err, wiki) => {
         if(err){
           console.log(err);
           res.redirect(500, "/wikis/new");
         } else {
           res.redirect(303, `/wikis/${wiki.id}`);
         }
       });
    } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/wikis");
    }
   },

    show(req, res, next){
         wikiQueries.getWiki(req.params.id, (err, wiki) => {
           if(err || wiki == null){
             res.redirect(404, "/");
           } else {
             wiki.html = markdown.toHTML(wiki.body);
             res.render("wikis/show", {wiki});
           }
         });
       },
  destroy(req, res, next){
        wikiQueries.deleteWiki(req.params.id, (err, deletedRecordsCount) => {
          if(err){
            res.redirect(500, `/wikis/${req.params.id}`)
          } else {
            res.redirect(303, `/wikis`)
          }
        });
      },
  edit(req, res, next){
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
          if(err || wiki == null){
            res.redirect(404, "/");
          } else {
            res.render("wikis/edit", {wiki});
          }
        });
      },
  update(req, res, next){
        wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {
          if(err || wiki == null){
            res.redirect(404, `/wikis/${req.params.id}/edit`);
          } else {
            res.redirect(`/wikis/${req.params.id}`);
          }
        });
      },
  makePublic(req, res, next) {
        wikiQueries.changeToPublic(req.params.id, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(500, `/wikis/${wiki.id}`);
            } else {
                res.redirect(303, `/wikis/`);
            }
        });
    },

}
