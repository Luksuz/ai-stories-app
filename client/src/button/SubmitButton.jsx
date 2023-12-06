import "./SubmitButton.scss";

export const SubmitButton = ({ text, handleClick, isDisabled }) => {
    return (
        <button type="button" className="submit-button" onClick={handleClick} disabled={isDisabled}>
            {text}
        </button>
    );
};
