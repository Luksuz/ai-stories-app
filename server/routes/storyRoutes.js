const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  getStories,
  createStories,
  getImages,
  getRecentStories,
} = require("../controllers/storyController");

/**
 * @swagger
 * /api/stories/generate:
 *   post:
 *     summary: Post a story part to OpenAI
 *     description: If there is user input, it returns an array[title, synopsis, part1] and an image prompt. If there are other parameters (e.g., user proceeded to generate other story parts), it returns the next part of the story and an image prompt.
 *     tags:
 *       - Stories
 *     requestBody:
 *       description: Request body for generating stories
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userInput:
 *                 type: string
 *                 description: User input for the first part of the story.
 *               title:
 *                 type: string
 *                 description: Title of the story.
 *               synopsis:
 *                 type: string
 *                 description: Synopsis of the story.
 *               previousPart:
 *                 type: string
 *                 description: Previous part of the story.
 *               nextPart:
 *                 type: string
 *                 description: Next part of the story.
 *               randomEvent:
 *                 type: string
 *                 description: Random event.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               response: ["A Kiss from an Angel", "The movie opens in present-day Trinity College, where Amelia Cross is preparing to set off for her first major archeological mission. She has been granted permission to excavate an unexplored cave in Greece, and is packing her bags when she finds a mysterious note, instructing her to follow her heart. With a spark of curiosity, Amelia sets off for her destination. Once in Greece, she finds the ancient cave and discovers an imposing statue of an angel - inscribed with an amulet and faded inscriptions. As she begins to unravel the mystery, she feels a strange presence - Enoch, an angel, has chosen her and is calling her to a quest. Knowing that she must follow her heart and discover the truth, Amelia agrees and they set off together, guided by an inner voice that unravels as they journey. Along the way, their friendship slowly blossoms into a passionate romance, as they defy the boundaries of time and reality. Their fate now linked, Amelia and Enoch venture towards the uncharted depths of their discoveries, towards a new understanding of love and a new level of faith.", "Dr. Amelia Cross, an archeologist and graduate of Trinity College, discovers an ancient statue buried deep in a cave in Greece. As she studies it, she finds a magical amulet at its base, and starts to feel a mysterious presence in her life, Unbeknownst to her, this presence is the angel Enoch, who has chosen her for a special mission. With Enoch as her guide, Amelia embarks on a journey of faith and discovery, traveling through time and space to uncover the deepest secrets of the past. Along the way, their friendship turns to slowly blossoming romance, as Amelia and Enoch defy the boundaries of time and reality, while unearthing the truth behind the legend of the amulet."]
 *               imagePrompt: "An eerie abandoned laboratory in the middle of a dense forest, with broken glass and dust covering the floors and desks. On a wooden table in the center lies an ancient device, its flickering lights reflecting off the mysterious writing that adorns it. Behind the device, a looming figure stands in the shadows, eyes gleaming with determination and a strong sense of purpose."
 *       '404':
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             example:
 *               error: "No user input or invalid user input"
 */
router.route("/generate").post(asyncHandler(getStories));

/**
 * @swagger
 * /api/stories/images:
 *   post:
 *     summary: Get image from OpenAI
 *     description: Get image from OpenAI based on the image prompt provided
 *     requestBody:
 *       description: Request body for fetching images
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagePrompt:
 *                 type: string
 *             required:
 *               - imagePrompt
 *     responses:
 *       '200':
 *         description: Successfully fetched images
 *       '400':
 *         description: Invalid request or an error occurred
 */
router.route("/images").post(asyncHandler(getImages));

router.route("/store").post(asyncHandler(createStories));

router.route("/recent").get(asyncHandler(getRecentStories));

module.exports = router;
