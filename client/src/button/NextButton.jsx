import { Button } from "./Buttons";
import "./NextButton.scss";
import { IoReturnUpForward } from "react-icons/io5";

export const NextButton = ({ text, handleClick, isDisabled }) => {
    return (
        <Button
            text={text}
            handleClick={handleClick}
            isDisabled={isDisabled}
            icon={<IoReturnUpForward />}
            iconRight={true}
            className="next-button"
        />
    );
};
