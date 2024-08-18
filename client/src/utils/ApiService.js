const fetchStory = async (synopsis, previousPart, nextPart, randomEvent, userInput) => {
    const response = await fetch(
      "http://lukamindek.myvnc.com:5001/api/stories/generate",
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
      "http://lukamindek.myvnc.com:5001/api/stories/images", {
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