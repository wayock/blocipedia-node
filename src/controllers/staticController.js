const sgMail = require('@sendgrid/mail');

module.exports = {
  index(req, res, next){
//move const sgMail & msg to signupController.js
    const msg = {
      to: 'wayock@gmail.com',
      from: 'test@example.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    res.render("static/index", {title: "Welcome to Blocipedia"});

  }
}
