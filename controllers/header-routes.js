const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// Get all posts
router.get('/', withAuth, async (req, res) => {
    try {
      const data = await Post.findAll({
        where:{"userId": req.session.userId},
        include: [User]
      });
      const allPosts = data.map((post) => post.get({ plain: true }));
  console.log(allPosts);
      res.render('all-posts', {
        layout: 'header',
        allPosts,
      });
    } catch (err) {
      res.redirect('login');
    }
  });


// click on post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const data = await Post.findByPk(req.params.id);
      if (data) {
        const post = data.get({ plain: true });
        console.log(post);
        res.render('edit-post', {
          layout: 'header',
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });

  // new post
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
      layout: 'header',
    });
  });

  module.exports = router;
