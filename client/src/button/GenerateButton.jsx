import { Button } from "./Buttons";
import "./GenerateButton.scss";
import { BsStars } from "react-icons/bs";

export const GenerateButton = ({ text, handleClick, isDisabled }) => {
    return (
        <Button
            text={text}
            handleClick={handleClick}
            isDisabled={isDisabled}
            icon={<BsStars />}
            className="generate-button"
        />
    );
};
