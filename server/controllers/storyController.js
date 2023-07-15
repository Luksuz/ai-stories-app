const express = require('express');
const { Configuration, OpenAIApi } = require("openai")
const asyncHandler = require("express-async-handler");
const env = require("dotenv").config();
const Story = require("../models/storyModel");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration)


//@desc generate stories
//@route POST /api/stories/generate
//@access Public

const getStories = asyncHandler(async (req, res) => {
  const {synopsis, previousPart, nextPart, randomEvent, userInput} = req.body;
  let response;
  console.log(req.body)
  if(userInput){
      console.log(userInput);
      response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `You are an AI developed by OpenAI.
      You have been trained on a vast range of internet text.
      But unlike most AI models, your specialty is in creating unique and compelling movie scenarios.
      You understand the elements of a great movie, including plot development, character arcs, conflict, and resolution.
      You can generate scenarios in any genre, time period, or setting.
      
      Your task is to generate 4 different sections divided by the %%% delimiter.:
      section1: The title based on the synopsis given.
      section2: A movie synopsis based on the user prompt given below.
      section3: The first part of the scenario based on synopsis.            
      section4: An image generation prompt that describes a key scene from the first part of the scenario. 

      The image prompt should be concise, vivid and descriptive.
      The image prompt should avoid using character-specific names or group identifiers, 
      but rather describe the characters and groups in broad terms for general understanding.
      and should not have the tag names included(synopsis, part1, ImagePrompt) for easier array splitting later. 
      ###
      prompt: An archeologist finds a lost treasure map and sails seven seas to find it.
      %%%
      title: 
      The Treasure of Atlantis
      %%%
      synopsis:
      Dr. Amelia Hart, a renowned archeologist, 
      stumbles upon an ancient treasure map hidden within a mysterious artifact at a dig site in Egypt. 
      The map, rumored to lead to the lost city of Atlantis, 
      sparks a journey that takes her from the dusty tombs of Egypt to the vast depths of the Atlantic Ocean. 
      Along the way, she must contend with rival treasure hunters, navigate treacherous underwater terrain,
      and unravel the mysteries of the map itself.
      As she dives deeper into the ocean and the secrets of the past, she discovers that the treasure of Atlantis is more than just gold and jewels 
      - it's a revelation that could change our understanding of human history.
      %%%
      part1:
      The movie opens in the sun-scorched deserts of Egypt. 
      Dr. Amelia Hart, a dedicated and slightly eccentric archeologist, is leading an excavation at a newly discovered pyramid. 
      Her team unearths a mysterious artifact - a small, ornate box sealed for thousands of years. 
      Inside, they find a parchment - a map, filled with cryptic symbols and markings. 
      Amelia recognizes these as ancient Atlantean - a language she has spent her career studying.
      News of the discovery spreads quickly, attracting the attention of rival treasure hunter, 
      Victor Stirling, a ruthless and wealthy collector of lost artifacts. 
      He offers a fortune to buy the map, but Amelia refuses, determined to follow the journey it outlines.
      With her loyal team, she sets off to find the necessary resources and equipment for the expedition. 
      They face numerous challenges, including securing funding, gathering a capable crew, and preparing for the unknown dangers of deep-sea exploration. 
      As they prepare, they are unaware that Stirling, feeling scorned, has begun to plot against them, determined to claim the treasure of Atlantis for himself.
      The first part ends with Amelia and her team setting sail into the Atlantic, the ancient map guiding their way. 
      Unbeknownst to them, Stirling's ship follows at a distance, setting the stage for the conflict to come.
      %%%
      ImagePrompt:
      A sun-soaked archaeological site in Egypt, with a prominent female archaeologist clutching an ancient, ornate box. 
      Within the box, a worn parchment map filled with mysterious symbols is revealed. 
      In the background, a group of excited explorers ready themselves for a maritime expedition, while a sinister ship hovers ominously on the distant horizon.            
      ###
      ###
      Prompt: A honeybee makes its way to Hollywood fame by imitating Snoop Dog.
      %%%
      title: 
      The Bee's Knees
      %%%
      synopsis:
      In an unprecedented twist of fate, a honeybee, Buzz, gains the ability to mimic human speech and behavior. 
      Buzz is no ordinary bee, though - he has an uncanny knack for imitating the one and only Snoop Dog. 
      When a down-on-his-luck film producer discovers Buzz's unique talent, they make their way to Hollywood, 
      where Buzz's impersonations make him an unlikely star. However, with fame comes challenges and Buzz soon finds that Hollywood isn't all it's buzzed up to be.
      %%%
      part1:
      The movie begins in the peaceful setting of a honeybee hive, where Buzz lives a typical bee life. 
      However, everything changes when he stumbles upon an old, discarded Snoop Dog CD. 
      Buzz finds himself drawn to the music and begins to mimic Snoop's unique style. 
      One day, a struggling film producer, Tom, who's in town for a music festival, overhears Buzz while he's hiking near the hive. 
      Amused and amazed by the bee's talent, he decides to bring Buzz to Hollywood, convinced that the bee's unique talent can save his sinking film career. 
      With a suitcase in one hand and a bee box in the other, Tom and Buzz set off to Hollywood, ready to take the film industry by storm. 
      Little do they know, Hollywood is a place like no other, filled with cutthroat competition and where fame can be fleeting.
      %%%
      ImagePrompt:
      An idyllic honeybee hive nestled in a lush field, with a tiny bee bobbing its head rhythmically to a faint beat. 
      Nearby, a confused yet intrigued man, ear pressed to a flower, listens to the peculiar rhythm echoing from the hive. 
      In the distance, the glimmering lights of Hollywood loom promisingly.
      ###
      ###
      prompt:
      ${userInput}
      %%%

      %%%
      
      %%%
      
      %%%
      
      ###
      `,
      max_tokens: 2000,
      temperature: 1
  });
  console.log(response.data.choices[0].text);
  if(response){
    res.status(200).json({response: response.data.choices[0].text, message: "This is the first part of the story"})
  } else {
      res.status(400).json({message: "an error happened!"})
  }

}else{
  console.log(req.body);
  response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: `Based on the synopsis given,write the next part of the story
  that corresponds to the previous part.Here are some examples.
  The part you will be generating is ${nextPart[0]}, the previous part is ${nextPart[1]}.
  if the random event is not empty, write a story part that corresponds to the random event.
  ###
  random event:

  synopsis:
  Dr. Amelia Hart, a renowned archeologist, 
  stumbles upon an ancient treasure map hidden within a mysterious artifact at a dig site in Egypt. 
  The map, rumored to lead to the lost city of Atlantis, 
  sparks a journey that takes her from the dusty tombs of Egypt to the vast depths of the Atlantic Ocean. 
  Along the way, she must contend with rival treasure hunters, navigate treacherous underwater terrain,
  and unravel the mysteries of the map itself.
  As she dives deeper into the ocean and the secrets of the past, she discovers that the treasure of Atlantis is more than just gold and jewels 
  - it's a revelation that could change our understanding of human history.
  previous part:
  The movie opens in the sun-scorched deserts of Egypt. 
  Dr. Amelia Hart, a dedicated and slightly eccentric archeologist, is leading an excavation at a newly discovered pyramid. 
  Her team unearths a mysterious artifact - a small, ornate box sealed for thousands of years. 
  Inside, they find a parchment - a map, filled with cryptic symbols and markings. 
  Amelia recognizes these as ancient Atlantean - a language she has spent her career studying.
  News of the discovery spreads quickly, attracting the attention of rival treasure hunter, 
  Victor Stirling, a ruthless and wealthy collector of lost artifacts. 
  He offers a fortune to buy the map, but Amelia refuses, determined to follow the journey it outlines.
  With her loyal team, she sets off to find the necessary resources and equipment for the expedition. 
  They face numerous challenges, including securing funding, gathering a capable crew, and preparing for the unknown dangers of deep-sea exploration. 
  As they prepare, they are unaware that Stirling, feeling scorned, has begun to plot against them, determined to claim the treasure of Atlantis for himself.
  The first part ends with Amelia and her team setting sail into the Atlantic, the ancient map guiding their way. 
  Unbeknownst to them, Stirling's ship follows at a distance, setting the stage for the conflict to come.
  next part:
  The ship sails deeper into the vast Atlantic, guided by the ancient map. 
  Excitement fills the air as Amelia and her team explore uncharted waters, searching for clues to unlock the secrets of Atlantis.
  They encounter natural wonders and face challenges along the way, relying on their skills and camaraderie.
  With each passing day, their anticipation grows, drawing them closer to the fabled city.
  Amelia's determination and the crew's shared ambition fuel their progress. 
  They envision the wonders that await in Atlantis, united by their thirst for knowledge and the thrill of discovery.
  As the ship sails onward, their hearts brimming with curiosity, they embrace the unknown. 
  The journey is not only about finding Atlantis but also about self-discovery and transformation.
  With their eyes fixed on the horizon, Amelia and her team embark on the next chapter of their adventure, ready to unveil the mysteries that lie beneath the waves.
  ###
  randomEvent: 
  a scorching fireball crashes into nearby ground.  
  synopsis:
  Dr. Amelia Hart, a renowned archeologist, embarks on a journey from Egypt's deserts to the depths of the Atlantic Ocean. 
  Armed with a treasure map said to lead to Atlantis, she faces rival treasure hunters, treacherous terrain, and the mysteries of the past. 
  As she dives deeper, the secrets of Atlantis become more profound, transcending mere riches. A scorching fireball ignites their path, amplifying their determination. 
  Amidst uncharted waters, they encounter wonders, united by ambition and the thrill of discovery. 
  With hearts brimming with curiosity, they unveil the mysteries beneath the waves, forever changed by this transformative adventure.
  previous part: 
  In the sun-scorched deserts of Egypt, 
  Dr. Amelia Hart leads an excavation at a newly discovered pyramid. Unearthing a mysterious artifact, she finds a map written in ancient Atlantean. 
  News spreads, attracting rival treasure hunter Victor Stirling, who seeks to claim the treasure of Atlantis. 
  Undeterred, Amelia sets off with her loyal team, unaware of Stirling's plotting.
  As they prepare for the journey, a scorching fireball crashes nearby, shaking the ground. Undeterred by this ominous event, 
  Amelia recognizes it as a sign of the powerful forces surrounding their quest. Setting sail into the Atlantic, guided by the ancient map, 
  Amelia and her team venture into the unknown. Unbeknownst to them, Stirling's ship follows, fueling the conflict to come.
  Amidst treacherous seas and rivalries, Amelia and her team persevere, driven by their thirst for knowledge and the thrill of discovery. 
  They navigate challenges, secure funding, and gather a capable crew, all while uncovering the mysteries of deep-sea exploration. 
  The stage is set for an epic adventure, where the secrets of Atlantis and the future of human history hang in the balance.
  next part:
  As the ship sails deeper into the vast Atlantic, guided by the ancient map, Amelia and her team feel a sense of anticipation and wonder. 
  The memory of the scorching fireball that crashed nearby during their preparations lingers in their minds, adding an extra layer of significance to their journey.
  Exploring uncharted waters, they search for clues to unlock the secrets of Atlantis. 
  Each challenge they face is intertwined with the fiery event, fueling their determination to understand its meaning. 
  Nature's wonders become more profound, resonating with the energy they witnessed.
  Amelia's unwavering resolve and the crew's camaraderie drive them forward. The fireball becomes a symbol of their shared ambition, 
  igniting their passion for discovering Atlantis and themselves. 
  Embracing the unknown, they know their journey is not just about the city but also about self-discovery and transformation.
  With eyes fixed on the horizon, Amelia and her team embark on the next chapter, ready to unveil the mysteries beneath the waves. 
  The impact of the scorching fireball remains with them, propelling their destined path to greatness.
  ###
  random event: ${randomEvent}
  synopsis: ${synopsis}
  previous part: ${previousPart}
  next part:`,
  max_tokens: 2000,
  temperature: 1
  });
  console.log("the response is:", response.data.choices[0].text);       
  if(response){
      res.status(200).json({response: response.data.choices[0].text, message: "This is the rest of the story"})
  } else {
      res.status(400).json({message: "an error happened!"})
  }
}});

//@desc store stories in the database
//@route POST /api/stories/store
//@access public

const createStories = asyncHandler(async (req, res) => {
  const { title, part1, part2, part3, part4, part5 } = req.body;
  console.log(req.body);
  if (!req.body) {
    res.status(400);
    throw new Error("No story data provided");
  }
  const story = await Story.create({
    userInput: req.body.userInput,
    synopsis: req.body.synopsis,
    title: title,
    part1: part1,
    part2: part2,
    part3: part3,
    part4: part4,
    part5: part5,
    randomEvents: req.body.randomEvents,
    imagePrompts: req.body.imagePrompts,
  });
  if (story) {
    res.status(201).json({message: "storyCreated"});
  }
  else {
    res.status(400).json({message: "Invalid story data(all parts must be filled)"});
  }
  console.log(story);
});

module.exports = {createStories, getStories}