import { SubmitButton } from "../../button/SubmitButton";
import { Spinner } from "../../spinner/Spinner";
import { Textarea } from "../../textarea/Textarea";

export const RandomEvent = ({ setRandomEvent, randomEvent, isLoading, submitClick }) => {
    return (
        <>
            <h4 className="chapter__footer--title">Custom event</h4>
            <Textarea
                placeholder="Add a random event that alters the next story parts and changes the outcome..."
                handleChange={(value) => setRandomEvent(value)}
                value={randomEvent}
                isDisabled={isLoading}
            />
            <div className="chapter__footer--title-spinner">
                <SubmitButton
                    text="Submit"
                    handleClick={submitClick}
                    isDisabled={isLoading || !randomEvent}
                />
                {isLoading && <Spinner />}
            </div>
        </>
    );
};
