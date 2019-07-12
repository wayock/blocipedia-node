const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      const msg = {
        to: newUser.email,
        from: 'WikiMaster@blocipedia.com',
        subject: 'Blocipedia Account Created!',
        text: 'Your Blocipedia account has been created. Login to join the fun!',
        html: '<strong>Welcome to Blocipedia! </strong><br>Your Blocipedia account has been created. Login to join the fun!',
      };
      sgMail.send(msg);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },



}
