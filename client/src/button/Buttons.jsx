import "./Button.scss";

export const Button = ({ text, handleClick, isDisabled, className = "", icon }) => {
    return (
        <button
            type="button"
            className={`button ${className}`}
            onClick={handleClick}
            disabled={isDisabled}
        >
            {icon}
            <span>{text}</span>
        </button>
    );
};
