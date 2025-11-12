const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category').populate('author');
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category').populate('author');
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    // Add user to req.body from authenticated user
    req.body.author = req.user._id;
    
    // Log database connection info
    const dbName = Post.db.name;
    const collectionName = Post.collection.name;
    console.log(`Database: ${dbName}, Collection: ${collectionName}`);
    console.log('Creating post with data:', JSON.stringify(req.body, null, 2));
    
    const post = await Post.create(req.body);
    console.log('Post created successfully:', post._id);
    console.log('Post saved to collection:', Post.collection.name);
    
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error('Error creating post:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      errors: err.errors
    });
    next(err);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
