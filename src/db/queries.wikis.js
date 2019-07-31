const Wiki = require("./models").Wiki;
const User = require("./models").User;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = {

  getAllWikis(callback){
    return Wiki.findAll()

    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getPublicWikis(user, callback){
    let options;
    if (user) {
      options = {[Op.or]:[{userId:user.id}, {private:false}]}

    } else {
      options = {
        private:false
      };
    }
    return Wiki.findAll({where: options})
     .then((wiki) => {
       callback(null, wiki);
     })
     .catch((err) => {
       callback(err);
     })
   },

  addWiki(newWiki, callback) {
    return Wiki.create(newWiki)
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      callback(err);
    })
  },

  getWiki(id, callback){
    return Wiki.findByPk(id)    //, {include: [{model: User, as: 'user'}] }
     .then((wiki) => {
       callback(null, wiki);
     })
     .catch((err) => {
       callback(err);
     })
   },

   deleteWiki(id, callback){
        return Wiki.destroy({
          where: { id }
        })
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        })
      },
   updateWiki(id, updatedWiki, callback){
         return Wiki.findByPk(id)
         .then((wiki) => {
           if(!wiki){
             return callback("Wiki not found");
           }

           wiki.update(updatedWiki, {
             fields: Object.keys(updatedWiki)
           })
           .then(() => {
             callback(null, wiki);
           })
           .catch((err) => {
             callback(err);
           });
         });
     },

     changeToPublic(id, callback) {
       return Wiki.findByPk(id)
       .then(wiki => {
         return wiki.update({
           private: false
         })
       })
       .catch(err => {
         console.log(err);
       });
     },

}
