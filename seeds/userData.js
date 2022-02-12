const { User } = require('../models');

const userdata =
[
  {
    "username": "Maizee",
    "password": "1234"
  },
  {
    "username": "Jen",
    "password": "1234"
  },
  {
    "username": "Frank",
    "password": "1234"
  },
  {
    "username": "Daisy",
    "password": "1234"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;