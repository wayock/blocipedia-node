'use strict';

const faker = require("faker");

//#2
 let wikis = [
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 4,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 4,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 4,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 5,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 5,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 5,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 6,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 6,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     private: false,
     userId: 6,
     createdAt: new Date(),
     updatedAt: new Date()
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
    return queryInterface.bulkInsert("Wikis", wikis, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Wikis", null, {});
  }
};
