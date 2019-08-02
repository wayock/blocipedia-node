'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
       foreignKey: "userId",
       onDelete: "CASCADE"
     });

   Wiki.hasMany(models.Collaborator, {
       foreignKey: "wikiId",
       as: 'collaborators'
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
