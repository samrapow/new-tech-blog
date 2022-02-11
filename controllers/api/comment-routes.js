const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// get comments
router.get('/', withAuth, async (req, res) => {
    try{ 
     const commentInfo = await Comment.findAll({
       include: [User],
     });
     const comments = commentInfo.map((comment) => comment.get({ plain: true }));
   
     console.log(comments);
     
     res.render('single-post', {comments, loggedIn: req.session.loggedIn});
   } catch(err) {
       res.status(500).json(err);
   }
   });

//    post comments
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newComment = await Comment.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;