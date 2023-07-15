function extractPrompts(text) {
  const prompts = text.split("%%%").map((prompt) => prompt.trim());
  prompts.forEach((prompt) => {
    prompt.length < 10 && prompts.splice(prompts.indexOf(prompt), 1);
  });
  return prompts;
}

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
    const pollutedStoryData = extractPrompts(data.response);
    const storyData = pollutedStoryData.map((item) =>
      item.replace(/ImagePrompt:|synopsis:|part1:/gi, "")
    );
    console.log(storyData);
    setStory((prevStory) => ({
      ...prevStory,
      title: storyData[0],
      synopsis: storyData[1],
      storyParts: {
        ...prevStory.storyParts,
        part1: storyData[2],
      },
      prompts: [...prevStory.prompts, storyData[3]],
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
        userInput: "",
      }),
    });
    const data = await response.json();
    switch (true) {
      case previousPart === story.storyParts.part1:
        setDataFetched((prevDataFetched) => ({
          ...prevDataFetched,
          part2Fetched: true,
        }));
        setStory((prevStory) => ({
          ...prevStory,
          storyParts: {
            ...prevStory.storyParts,
            part2: data.response,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
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
            part3: data.response,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
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
            part4: data.response,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
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
            part5: data.response,
          },
          randomEvents: [
            ...prevStory.randomEvents,
            randomEvent ? `random input: ${randomEvent} at ${nextPart}` : "",
          ],
        }));
        break;
      default:
        console.log("something went wrong");
        console.log(previousPart, previousPart, nextPart);
    }
    setDataFetched((prevDataFetched) => ({
      ...prevDataFetched,
      lastPartFetched: data.response,
    }));
    setRandomEventInput("");
  } catch (error) {
    console.log(error);
  }
  setIsGenerating(false);
}

// a function for saving the story to the database(must include the title and all 5 parts)
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
    }),
  });
  const data = await response.json();
  console.log(data);
}

export { fetchBotReply, generateStoryParts, saveStories };
