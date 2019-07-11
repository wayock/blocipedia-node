//const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {

  signUp(req, res, next){
    res.render("users/sign_up");
  },
}
