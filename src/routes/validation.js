module.exports = {

  validateUsers(req, res, next) {
    if(req.method === "POST") {
      //req.checkBody("username", "must be at least 1 character in length").isLength({min: 1});
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },

  validateWikis(req, res, next) {
      console.log("validateWikis");
  //#1
      if(req.method === "POST") {

  //#2
        //req.checkParams("userId", "must be valid").notEmpty().isInt();
        req.checkBody("title", "must be at least 1 character and no more than 30 in length").isLength({min: 1, max:30});
        req.checkBody("body", "must be at least 1 character in length").isLength({min: 1});
      }

  //#3
      const errors = req.validationErrors();
      console.log(errors);
      if (errors) {

  //#4
        req.flash("error", errors);
        return res.redirect(303, req.headers.referer)
      } else {
        return next();
      }
    },

}
