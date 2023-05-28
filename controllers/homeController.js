// controllers/home-controllers.js

const { Post, User, Comment } = require('../models'); // Assuming you have defined the necessary models

const homeController = {
  // GET / - Render the homepage with existing blog posts
  getHomepage: async (req, res) => {
    try {
      // Retrieve all blog posts with associated user and comment data
      const posts = await Post.findAll({
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] }
        ],
        order: [['createdAt', 'DESC']] // Order the posts by creation date, descending
      });

      // Render the homepage view with the retrieved posts
      res.render('homepage', { posts });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).send('An error occurred while retrieving blog posts.');
    }
  },

  // GET /post/:id - Render a single blog post with associated comments
  getSinglePost: async (req, res) => {
    const postId = req.params.id;

    try {
      // Retrieve the blog post with associated user and comment data
      const post = await Post.findByPk(postId, {
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] }
        ]
      });

      if (!post) {
        // If the post is not found, handle the error and send an appropriate response
        return res.status(404).send('Post not found.');
      }

      // Render the single post view with the retrieved post data
      res.render('single-post', { post });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).send('An error occurred while retrieving the blog post.');
    }
  }
};

module.exports = homeController;
