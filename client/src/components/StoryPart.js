import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import RandomEventBtn from "./RandomEvent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StoryPart.css";
import {
  fetchBotReply,
  generateStoryParts,
  generateImages,
} from "../utils/ApiUtils";

export default function StoryPart() {
  const [userInput, setUserInput] = useState("");
  const [randomEventInput, setRandomEventInput] = useState("");
  const [story, setStory] = useState({
    title: null,
    synopsis: "",
    storyParts: {
      part1: null,
      part2: null,
      part3: null,
      part4: null,
      part5: null,
    },
    randomEvents: [],
    imagePrompts: [],
    images: [],
  });
  // a state for tracking which parts of the story have been fetched from the openai
  // (unnecessary and has to be refactored)
  const [dataFetched, setDataFetched] = useState({
    part1Fetched: false,
    part2Fetched: false,
    part3Fetched: false,
    part4Fetched: false,
    part5Fetched: false,
    lastPartFetched: null,
  });
  // a state for tracking which part of the story is the previous one and which is the next one[nextPart, previousPart]
  const [nextPart, setNextPart] = useState(null);
  // a flag for disabling the submit button while the story is being generated and spinners to take effect.
  const [isGenerating, setIsGenerating] = useState(false);

  // a hook for generating the next part of the story when the previous one is fetched
  useEffect(() => {
    const lastPrompt = story.imagePrompts.length - 1;
    switch (true) {
      case dataFetched.part4Fetched:
        setNextPart(["part 5", "part 4"]);
        generateImages(story.imagePrompts[lastPrompt], setStory);
        break;
      case dataFetched.part3Fetched:
        setNextPart(["part 4", "part 3"]);
        generateImages(story.imagePrompts[lastPrompt], setStory);
        break;
      case dataFetched.part2Fetched:
        setNextPart(["part 3", "part 2"]);
        generateImages(story.imagePrompts[lastPrompt], setStory);
        break;
      case dataFetched.part1Fetched:
        setNextPart(["part 2", "part 1"]);
        generateImages(story.imagePrompts[0], setStory);
        break;
      default:
        setNextPart(null);
    }
    setRandomEventInput("");
    // eslint-disable-next-line
  }, [dataFetched]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsGenerating(true);
    await fetchBotReply(userInput, setStory, setDataFetched, setIsGenerating);
    setUserInput("");
  };

  function resetStory() {
    setUserInput("");
    setStory({
      title: null,
      synopsis: "",
      storyParts: {
        part1: null,
        part2: null,
        part3: null,
        part4: null,
        part5: null,
      },
      randomEvents: [],
      imagePrompts: [],
      images: [],
    });
    setDataFetched({
      part1Fetched: false,
      part2Fetched: false,
      part3Fetched: false,
      part4Fetched: false,
      part5Fetched: false,
      lastPartFetched: null,
    });
    setNextPart(null);
    setRandomEventInput("");
  }

  // a function for mapping the story parts to the DOM
  const mappedStories = Object.values(story.storyParts)
    .filter((storyPart) => storyPart)
    .map((storyPart, index) => (
      <div key={index}>
        <p className="radius-1 p-2 ">{storyPart}</p>
        <img src={story.images[index]} className="w-100" alt={(index + 1) + ". story part"}></img>
        {dataFetched.lastPartFetched === storyPart && (
          <div className="story-buttons">
            {!isGenerating ? (
              <>
                <Button
                  variant="success"
                  onClick={() =>
                    generateStoryParts(
                      story.synopsis,
                      dataFetched.lastPartFetched,
                      nextPart,
                      randomEventInput,
                      story,
                      setStory,
                      setDataFetched,
                      setIsGenerating,
                      setRandomEventInput
                    )
                  }
                >
                  Generate next part
                </Button>
                <RandomEventBtn
                  value={randomEventInput}
                  onChange={(event) => setRandomEventInput(event.target.value)}
                />
                <Button variant="danger" onClick={() => resetStory()}>
                  Reset
                </Button>
              </>
            ) : (
              <Button variant="success" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            )}
          </div>
        )}
      </div>
    ));

  return (
    <>
      <Row className="storyPart justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <form className="input-box p-5" onSubmit={handleSubmit}>
            <label className="label">
              Your imagination goes here:
              <input
                className="input-text"
                value={userInput}
                type="text"
                name="story"
                placeholder="input prompt"
                onChange={handleChange}
              />
            </label>
            {isGenerating? <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Generating...
              </Button> :
            <Button
              variant={
                dataFetched.part1Fetched || isGenerating
                  ? "secondary"
                  : "primary"
              }
              className="submit-button rounded-pill"
              type="submit"
              value="Submit"
              disabled={dataFetched.part1Fetched || isGenerating}
            >
              Submit
            </Button>
            }
          </form>
        </Col>
      </Row>
      <Row className="storyPart justify-content-center">
        <Col className="story-container" md={12}>
          <div>
            {story.title && <h2>{story.title}</h2>}
            {mappedStories}
          </div>
        </Col>
      </Row>
    </>
  );
}
