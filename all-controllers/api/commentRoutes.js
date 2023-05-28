const router = require('express').Router();
const { Comment } = require('../../models');

// Route: /api/comments

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(201).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment by ID
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Comment updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Comment deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
