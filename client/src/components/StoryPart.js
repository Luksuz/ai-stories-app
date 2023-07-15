import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import RandomEventBtn from "./RandomEvent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StoryPart.css";
import {
  fetchBotReply,
  generateStoryParts,
  saveStories,
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
    prompts: [],
  });
  const [dataFetched, setDataFetched] = useState({
    part1Fetched: false,
    part2Fetched: false,
    part3Fetched: false,
    part4Fetched: false,
    part5Fetched: false,
    lastPartFetched: null,
  });
  const [nextPart, setNextPart] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    switch (true) {
      case dataFetched.part4Fetched:
        setNextPart(["part 5", "part 4"]);
        break;
      case dataFetched.part3Fetched:
        setNextPart(["part 4", "part 3"]);
        break;
      case dataFetched.part2Fetched:
        setNextPart(["part 3", "part 2"]);
        break;
      case dataFetched.part1Fetched:
        setNextPart(["part 2", "part 1"]);
        break;
      default:
        setNextPart(null);
    }
    setRandomEventInput("");
  }, [dataFetched]);

  useEffect(() => {
    saveStories(story, userInput);
  }, [story.storyParts.part5]);

  /*useEffect(() => {
      if(dataFetched.promptsFetched) {
          const fetchImagesSequentially = async () => {
              for (let i = 0; i < story.prompts.length; i++) {
                  await generateImages(story.prompts[i]);
                  await sleep(1000);
              }
          }
          fetchImagesSequentially();
          }
      }, [dataFetched.promptsFetched])*/

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsGenerating(true);
    console.log(isGenerating);
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
      prompts: [],
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
    setIsGenerating(false);
  }

  const mappedStories = Object.values(story.storyParts)
    .filter((storyPart) => storyPart) // Filter out null or undefined parts
    .map((storyPart, index) => (
      <div key={index}>
        <p>{storyPart}</p>
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
                      nextPart[1],
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
          </form>
        </Col>
      </Row>
      <Row className="storyPart justify-content-center">
        <Col className="story-container" md={12}>
          <div className="story-text">
            <h1>{story.title}</h1>
            {mappedStories}
          </div>
        </Col>
      </Row>
    </>
  );
}
