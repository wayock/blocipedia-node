'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    private: DataTypes.BOOLEAN
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
       foreignKey: "userId",
       onDelete: "CASCADE"
     });

   Wiki.addScope("lastFiveFor", (userId) => {
       return {
         where: { userId: userId},
         limit: 5,
         order: [["createdAt", "DESC"]]
       }
     });

  };
  return Wiki;
};
