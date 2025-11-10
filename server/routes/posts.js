const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { validatePost } = require('../middleware/validator');
const { protect } = require('../middleware/auth');

router.route('/').get(getPosts).post(protect, validatePost, createPost);
router.route('/:id').get(getPost).put(protect, validatePost, updatePost).delete(protect, deletePost);

module.exports = router;
