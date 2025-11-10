const { body, validationResult } = require('express-validator');

const validatePost = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('content').not().isEmpty().withMessage('Content is required'),
  body('category').not().isEmpty().withMessage('Category is required'),
  body('author').not().isEmpty().withMessage('Author is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCategory = [
  body('name').not().isEmpty().withMessage('Name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validatePost,
  validateCategory,
};
