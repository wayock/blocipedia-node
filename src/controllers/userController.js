//const userQueries = require("../db/queries.users.js");
//const passport = require("passport");
const sgMail = require('@sendgrid/mail');

module.exports = {

  signUp(req, res, next){
    res.render("/users/sign_up");
  },

  /* move inside of createconst sgMail & msg to signupController.js
      const msg = {
        to: 'wayock@gmail.com',
        from: 'test@example.com',
        subject: 'Blocipedia Account Created!',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>Your Blocipedia account has been created. Login to join the fun!</strong>',
      };
      sgMail.send(msg);
  */
}
