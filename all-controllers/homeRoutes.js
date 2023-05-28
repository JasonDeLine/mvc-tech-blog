const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Home page route
router.get('/', async (req, res) => {
  try {
    // Get all posts from the database
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Serialize the post data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass the serialized post data and session flag to the home template
    res.render('home', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
