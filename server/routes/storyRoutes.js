const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { getStories, createStories } = require('../controllers/storyController');

router.route("/generate")
  .post(getStories)

router.route("/store")
  .post(createStories)

module.exports = router;