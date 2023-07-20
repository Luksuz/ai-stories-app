const express = require('express');
const router = express.Router();
//validateToken will be implemented later for user authentication
const validateToken = require('../middleware/validateTokenHandler');
const { getStories, createStories, getImages, getRecentStories } = require('../controllers/storyController');

router.route("/generate")
  .post(getStories)

router.route("/images")
  .post(getImages)

router.route("/store")
  .post(createStories)

router.route("/recent")
  .get(getRecentStories)

module.exports = router;