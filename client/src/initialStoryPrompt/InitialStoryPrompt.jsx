import "./InitialStoryPrompt.scss";
import { GenerateButton } from "../button/GenerateButton";
import { Textarea } from "../textarea/Textarea";
import { useContext, useState } from "react";
import { StoryContext } from "../context/StoryContext";
import { fetchStory } from "../utils/ApiService";
import { Spinner } from "../spinner/Spinner";

export const InitialStoryPrompt = ({ setInitialChapter }) => {
    const { _, setStory } = useContext(StoryContext);
    const [randomEvent, setRandomEvent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateAStoryClick = async () => {
        setIsLoading(() => true);

        await setInitialChapter(randomEvent);

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
