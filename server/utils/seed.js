const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const slugify = require('slugify');

// Load env vars
dotenv.config({ path: './.env' });

// Load models
const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Seed Data
const importData = async () => {
  try {
    // Ensure we have at least one user and one category
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        username: 'seeduser',
        email: 'seeduser@example.com',
        password: 'password123', // Note: password will be hashed by the model's pre-save hook
      });
      console.log('Created a sample user.');
    }

    let category = await Category.findOne();
    if (!category) {
      category = await Category.create({ name: 'General' });
      console.log('Created a sample category.');
    }

    const posts = [];
    for (let i = 0; i < 10; i++) {
      const title = faker.lorem.sentence();
      posts.push({
        title: title,
        slug: slugify(title, { lower: true, strict: true }),
        content: faker.lorem.paragraphs(5),
        author: user._id,
        category: category._id,
      });
    }

    // Using Post.create in a loop to ensure pre-save hooks are triggered
    for (const post of posts) {
      await Post.create(post);
    }

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();

  if (process.argv[2] === '-i') {
    await importData();
  } else if (process.argv[2] === '-d') {
    await deleteData();
  } else {
    console.log('Please use the -i flag to import data or -d to delete data.');
    process.exit();
  }
};

run();
