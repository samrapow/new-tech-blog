const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// create post route
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
      console.log(body);
    try {
      const newPost = await Post.create({ ...body, userId: req.session.userId });
      console.log("New Post: ",  newPost);
      res.json(newPost);
       } catch (err) {
         console.log('Post creation failed', err);
      res.status(500).json(err);
    }
  });

// update post route
router.put('/:id', withAuth, async (req, res) => {
    try {
      console.log('req.body:', req.body);
      const [impactedRows] = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (impactedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete post route
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [impactedRows] = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (impactedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;