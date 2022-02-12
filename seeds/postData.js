const { Post } = require('../models');

const postdata =
[
  {
    "postTitle": "New office",
    "postContent": "I just remodeled my home office!",
    "userId": 1
  },
  {
    "postTitle": "Watches",
    "postContent": "I love collecting watches",
    "userId": 2
  },
  {
    "postTitle": "French Bulldogs",
    "postContent": "They snore super loudly",
    "userId": 3
  },
  {
    "postTitle": "Pugs",
    "postContent": "They have flat faces and curly tails",
    "userId": 4
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;