const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validator');
const { protect } = require('../middleware/auth');

router.route('/').get(getCategories).post(protect, validateCategory, createCategory);

module.exports = router;
