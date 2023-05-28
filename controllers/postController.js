// controllers/post-controller.js

const { Post, User } = require('../models'); // Assuming you have defined the necessary models

const postController = {
  // POST /api/posts - Create a new blog post
  createPost: async (req, res) => {
    const { title, content } = req.body;

    try {
      // Create a new post in the database
      const post = await Post.create({
        title,
        content,
        userId: req.session.userId // Associate the post with the logged-in user
      });

      // Send a success response with the created post data
      res.status(201).json(post);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ message: 'Failed to create the blog post.' });
    }
  },

  // PUT /api/posts/:id - Update an existing blog post
  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    try {
      // Find the post to be updated
      const post = await Post.findByPk(postId);

      if (!post) {
        // If the post is not found, handle the error and send an appropriate response
        return res.status(404).json({ message: 'Post not found.' });
      }

      // Update the post with new data
      post.title = title;
      post.content = content;
      await post.save();

      // Send a success response with the updated post data
      res.json(post);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ message: 'Failed to update the blog post.' });
    }
  },

  // DELETE /api/posts/:id - Delete a blog post
  deletePost: async (req, res) => {
    const postId = req.params.id;

    try {
      // Find the post to be deleted
      const post = await Post.findByPk(postId);

      if (!post) {
        // If the post is not found, handle the error and send an appropriate response
        return res.status(404).json({ message: 'Post not found.' });
      }

      // Delete the post from the database
      await post.destroy();

      // Send a success response
      res.status(204).send();
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ message: 'Failed to delete the blog post.' });
    }
  }
};

module.exports = postController;
