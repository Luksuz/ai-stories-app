import "./SubscribeButton.scss";

export const SubscribeButton = ({ text, handleClick, isDisabled }) => {
    return (
        <button
            type="button"
            className="subscribe-button"
            onClick={handleClick}
            disabled={isDisabled}
        >
            <span>{text}</span>
        </button>
    );
};
