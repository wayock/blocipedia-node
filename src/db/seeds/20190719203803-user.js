'use strict';

const faker = require("faker");


let users = [
  {
    username: 'Johnny',
    email: 'wayock@yahoo.com',
    password: 123456,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 0,
  },
  {
    username: 'M-Elise',
    email: 'mary121110@yahoo.com',
    password: 123456,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 0,
  },
  {
    username: 'Premium Dude',
    email: 'premiumdude@gmail.com',
    password: 123456,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 1,
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */



  return queryInterface.bulkInsert("Users", users, {});

},

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users",null, {});
  }
};
