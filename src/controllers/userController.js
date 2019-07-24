const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const publishableKey = process.env.PUBLISHABLE_KEY;
// (async () => {
//   const charge = await stripe.charges.create({
//
//     amount: 999,
//     currency: 'usd',
//     source: 'tok_visa',
//     receipt_email: 'jenny.rosen@example.com',
//   });
//   console.log(charge);
// }) ();
// (async () => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     subscription_data: {
//       items: [{
//         id: 'prod_FUhdT7toc8YxUa',
//       }],
//     },
//     success_url: 'https://example.com/success',
//     cancel_url: 'https://example.com/cancel',
//   });
//     console.log(session);
// })();



module.exports = {

  signUp(req, res, next){
    res.render("users/signup");
  },

  create(req, res, next){
    //console.log("user created");
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {

        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
  },

  signInForm(req, res, next){
    res.render("users/signin");
  },

  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },

  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },

  show(req, res, next){

    userQueries.getUser(req.params.id, (err, result) => {

      if(err || result.user === undefined){
        req.flash("notice", "No user found with that ID.");
        res.redirect("/");
      } else {

        res.render("users/show", {...result});
      }
    });
  },

  upgradePage(req, res, next){
        userQueries.getUser(req.params.id, (err, result) => {
          if(err || result == null){
            res.redirect(404, "/");
          } else {
            res.render("users/upgrade-page", {user: result.user});
          }
        });
      },
  upgrade(req, res, next) {
    userQueries.upgradeUser(req.params.id, (err, result) => {
      const amount = 1500;

      stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer => {
        return stripe.charges.create({
          amount,
          description: "Blocipedia Premium Account",
          currency: "usd",
          customer: customer.id
        });
      })
      .then(charge => {
        console.log("charge", charge);
        if (charge) {
          req.flash(
            "notice",
            "WooWho!!! You're a premium user! Start making your private wikis."
          );
          res.redirect("/wikis");
        } else {
          req.flash("notice", "Error - upgrade unsuccessful");
          res.redirect("/users/show", { user });
        }
      })
      .catch(err => {
        console.log(err);
      });
    });
  },
  downgrade(req, res, next) {
    userQueries.downgradeUser(req.params.id, (err, result) => {
      if (result) {
        req.flash(
          "notice",
          "You have been downgraded to a standard member.  You can become a premium member again at any time!"
        );
        res.redirect("/wikis");
      } else {
        req.flash("notice", "Error: Something went wrong.  Please try to downgrade again.");
        res.redirect("/users/show", { user });
      }
    });
  }


}
