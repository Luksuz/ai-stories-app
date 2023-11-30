import "./InitialStoryPrompt.scss";
import { GenerateButton } from "../button/GenerateButton";
import { Textarea } from "../textarea/Textarea";
import { useContext, useState } from "react";
import { StoryContext } from "../context/StoryContext";
import { fetchStory } from "../utils/ApiService";
import { Spinner } from "../spinner/Spinner";

export const InitialStoryPrompt = () => {
    const { _, setStory } = useContext(StoryContext);
    const [randomEvent, setRandomEvent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateAStoryClick = async () => {
        setIsLoading(() => true);

        const data = await fetchStory("", "", "", "", randomEvent);

        setStory({
            userPrompt: "",
            activeChapterId: 1,
            chapters: [
                {
                    id: 1,
                    message: data.message,
                    imagePrompt: data.imagePrompt,
                    storyData: {
                        title: data.storyData[0],
                        synopsis: data.storyData[1],
                        content: data.storyData[2],
                    },
                },
            ],
        });
        setIsLoading(() => false);
    };

    return (
        <>
            <h3 className="first-screen__subtitle">Your prompt</h3>
            <Textarea
                placeholder="A magical fish..."
                value={randomEvent}
                handleChange={(value) => setRandomEvent(value)}
            />
            <div className="first-screen__button-spinner">
                <GenerateButton
                    text="Generate a story"
                    handleClick={handleGenerateAStoryClick}
                    isDisabled={isLoading || !randomEvent}
                />
                {isLoading && <Spinner />}
            </div>
        </>
    );
};
