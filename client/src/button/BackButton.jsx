import { Button } from "./Buttons";
import "./BackButton.scss";
import { IoReturnUpBack } from "react-icons/io5";

export const BackButton = ({ text, handleClick, isDisabled }) => {
    return (
        <Button
            text={text}
            handleClick={handleClick}
            isDisabled={isDisabled}
            icon={<IoReturnUpBack />}
            className="back-button"
        />
    );
};
