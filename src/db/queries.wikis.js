const Wiki = require("./models").Wiki;
const User = require("./models").User;


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


  addWiki(newWiki, callback) {
    console.log("addWiki() is called.");
    return Wiki.create(newWiki)
    .then((wiki) => {
      console.log("SUCCESS: ", wiki);
      callback(null, wiki);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      callback(err);
    })
  },
  getWiki(id, callback){
    return Wiki.findByPk(id)
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

}
