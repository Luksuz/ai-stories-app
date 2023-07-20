// a function for fetching the initial part of the story

async function fetchBotReply(
  userInput,
  setStory,
  setDataFetched,
  setIsGenerating
) {
  try {
    setIsGenerating(true);
    const response = await fetch("http://localhost:5000/api/stories/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        synopsis: "",
        previousPart: "",
        nextPart: "",
        randomEvent: "",
        userInput: userInput,
      }),
    });
    const data = await response.json();
    const imagePrompt = data.imagePrompt;
    const pollutedData = data.response;
    const storyData = pollutedData.map((item) =>
      item.replace(/ImagePrompt:|synopsis:|part1:/gi, "")
    );
    setStory((prevStory) => ({
      ...prevStory,
      title: storyData[0],
      synopsis: storyData[1],
      storyParts: {
        ...prevStory.storyParts,
        part1: storyData[2],
      },
      imagePrompts: [...prevStory.imagePrompts, imagePrompt],
    }));
    setDataFetched((prevDataFetched) => ({
      ...prevDataFetched,
      part1Fetched: true,
      lastPartFetched: storyData[2],
    }));
  } catch (error) {
    console.log(error);
  }
  setIsGenerating(false);
}

// a function for generating the rest of the story parts(2-5)
async function generateStoryParts(
  synopsis,
  previousPart,
  nextPart,
  randomEvent,
  story,
  setStory,
  setDataFetched,
  setIsGenerating,
  setRandomEventInput
) {
  try {
    setIsGenerating(true);
    const response = await fetch("http://localhost:5000/api/stories/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        synopsis: synopsis,
        previousPart: previousPart,
        nextPart: nextPart,
        randomEvent: randomEvent,
        imagePrompt: story.imagePrompts[story.imagePrompts.length - 1],
        userInput: "",
      }),
    });
    const data = await response.json();
    let storyPart = data.response;
    let imagePrompt = data.imagePrompt;
    storyPart = storyPart.replace(/nextPart:/gi, "")
    imagePrompt = imagePrompt.replace(/ImagePrompt:/gi, "")
    switch (true) {
      case previousPart === story.storyParts.part1:
        setStory((prevStory) => ({
          ...prevStory,
          storyParts: {
            ...prevStory.storyParts,
            part2: storyPart,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
          imagePrompts: [...prevStory.imagePrompts, imagePrompt],
        }));
        setDataFetched((prevDataFetched) => ({
          ...prevDataFetched,
          part2Fetched: true,
        }));
        break;
      case previousPart === story.storyParts.part2:
        setDataFetched((prevDataFetched) => ({
          ...prevDataFetched,
          part3Fetched: true,
        }));
        setStory((prevStory) => ({
          ...prevStory,
          storyParts: {
            ...prevStory.storyParts,
            part3: storyPart,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
          imagePrompts: [...prevStory.imagePrompts, imagePrompt],
        }));
        break;
      case previousPart === story.storyParts.part3:
        setDataFetched((prevDataFetched) => ({
          ...prevDataFetched,
          part4Fetched: true,
        }));
        setStory((prevStory) => ({
          ...prevStory,
          storyParts: {
            ...prevStory.storyParts,
            part4: storyPart,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
          imagePrompts: [...prevStory.imagePrompts, imagePrompt],
        }));
        break;
      case previousPart === story.storyParts.part4:
        setDataFetched((prevDataFetched) => ({
          ...prevDataFetched,
          part5Fetched: true,
        }));
        setStory((prevStory) => ({
          ...prevStory,
          storyParts: {
            ...prevStory.storyParts,
            part5: storyPart,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
          imagePrompts: [...prevStory.imagePrompts, imagePrompt],
        }));
        break;
      default:
        console.log("something went wrong");
        console.log(previousPart, previousPart, nextPart);
    }
    setDataFetched((prevDataFetched) => ({
      ...prevDataFetched,
      lastPartFetched: storyPart,
    }));
    setRandomEventInput("");
  } catch (error) {
    console.log(error);
  } 
  setIsGenerating(false);
}


// a function for fetching images from the openai
async function generateImages(prompt, setStory) {
  const response = await fetch("http://localhost:5000/api/stories/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imagePrompt: prompt })
  });
  const data = await response.json();
  setStory((prevState) => ({
    ...prevState,
    images: [...prevState.images, data.response]
  }));
}

// a function for saving the story to the database(must include all of the story data from the storyModel)
async function saveStories(story) {
  const { part1, part2, part3, part4, part5 } = story.storyParts;
  const response = await fetch("http://localhost:5000/api/stories/store", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userInput: story.userInput,
      synopsis: story.synopsis,
      title: story.title,
      part1: part1,
      part2: part2,
      part3: part3,
      part4: part4,
      part5: part5,
      randomEvents: story.randomEvents,
      imagePrompts: story.prompts,
      images: story.images
    }),
  });
  const data = await response.json();
}

// a function for loading the most recent stories from the database
async function loadRecentStories() {
  const response = await fetch("http://localhost:5000/api/stories/recent");
  const data = await response.json();
  return data;
};

export { fetchBotReply, generateStoryParts, saveStories, generateImages, loadRecentStories };
