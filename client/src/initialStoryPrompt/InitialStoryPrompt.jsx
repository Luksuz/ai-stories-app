import "./InitialStoryPrompt.scss";
import { GenerateButton } from "../button/GenerateButton";
import { Textarea } from "../textarea/Textarea";
import { Spinner } from "../spinner/Spinner";
import { useState } from "react";

export const InitialStoryPrompt = ({ setInitialChapter }) => {
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
