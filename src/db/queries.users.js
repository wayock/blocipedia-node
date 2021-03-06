const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const wikiQueries = require("./queries.wikis.js");
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

  getUser(id, callback){
    // #1
    let result = {};
    User.findByPk(id)
    .then((user) => {
      // #2
      if(!user) {
        callback(404);
      } else {
        // #3
        result["user"] = user;
        // #4
        Wiki.scope({method: ["lastFiveFor", id]}).findAll()
        //Wiki.findAll()
        .then((wikis) => {
          // #5
          result["wikis"] = wikis;
          callback(null, result);
        })
        .catch((err) => {
          callback(err);
        })
      }
    })
  },

  upgradeUser(id, callback) {
        User.findByPk(id)
            .then(user => {
                user.update({
                    role: 1
                });
                callback(null, user);
            })
            .catch(err => {
                callback(err);
            });
    },

    downgradeUser(id, callback) {
      User.findByPk(id, {include: {model:Wiki, as: 'wikis'}}) //needed to reference wikis in Wikis table
      .then(user => {
        user.update({
          role: 0
        });
        //iterate over user.wikis
        console.log(user.wikis);//forEach set wikiQueries.changeToPublic
        user.wikis.forEach(wiki => {
          wikiQueries.changeToPublic(wiki.id, () => {});
        });
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
    },

    getUserCollaborators(id, callback) {
      let result = {};
      User.findByPk(id).then(user => {
        if (!user) {
          callback(404);
        } else {
          result["user"] = user;
          Collaborator.scope({ method: ["collaboratorFor", id] })
          .findAll()
          .then(collaborator => {
            result["collaborator"] = collaborator;
            callback(null, result);
          })
          .catch(err => {
            callback(err);
          });
        }
      });
    }
}
