const fetchStory = async (synopsis, previousPart, nextPart, randomEvent, userInput) => {
    const response = await fetch(
      "https://us-central1-woven-perigee-425918-q9.cloudfunctions.net/aistories_generate_text",
      {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          synopsis: synopsis,
          previousPart: previousPart,
          nextPart: nextPart,
          randomEvent: randomEvent,
          userInput: userInput,
        }),
      }
    );
    const data = await response.json();
  
    const storyData = Array.isArray(data.response) ? data.response.map((item) =>
      item.replace(/ImagePrompt:|title:|synopsis:|part1:/gi, "")
    ) : data.response;
  
    return { imagePrompt: data.imagePrompt, message: data.message, storyData: storyData };
  }
  
  const fetchImage = async (imagePrompt) => {
    const response = await fetch(
      "https://europe-west3-woven-perigee-425918-q9.cloudfunctions.net/aistories_generate_img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imagePrompt: imagePrompt })
    });
  
    const data = await response.json();
  
    return data.response;
  }
  
  export { fetchStory, fetchImage };