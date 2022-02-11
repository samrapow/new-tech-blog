const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');



// login and signup routes
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/header');
      return;
    }
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/header');
      return;
    }
  
    res.render('signup');
  });

// get all posts
router.get('/', async (req, res) => {
    try {
      const data = await Post.findAll({
        include: [User],
      });
      const allPosts = data.map((post) => post.get({ plain: true }));
      res.render('all-posts-admin', { allPosts, loggedIn: req.session.loggedIn});
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get one post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
      const data = await Post.findOne({
        where: {id: req.params.id},
        include: [
          User,
          {
            model: Comment,
            include: [User],
          },
        ],
      });
  
      if (data) {
        const selectedPost = data.get({ plain: true });
        console.log(selectedPost);
        res.render('single-post', { selectedPost, loggedIn: req.session.loggedIn});
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
