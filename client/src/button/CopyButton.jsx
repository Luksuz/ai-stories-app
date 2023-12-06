import { useState } from "react";
import { Button } from "./Buttons";
import "./CopyButton.scss";
import { PiCopySimpleLight } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";

export const CopyButton = ({ text, handleClick, isDisabled }) => {
    const [changeIcon, setChangeIcon] = useState(false);

    const onClick = () => {
        handleClick();
        setChangeIcon(() => true);
        setTimeout(() => {
            setChangeIcon(false);
        }, 1200);
    };

    return (
        <Button
            text={text}
            handleClick={onClick}
            isDisabled={isDisabled}
            icon={changeIcon ? <IoMdCheckmark /> : <PiCopySimpleLight />}
            className="copy-button"
        />
    );
};
