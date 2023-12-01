import "./Button.scss";

export const Button = ({
    text,
    handleClick,
    isDisabled,
    className = "",
    icon,
    iconRight = false,
}) => {
    return (
        <button
            type="button"
            className={`button ${className}`}
            onClick={handleClick}
            disabled={isDisabled}
        >
            {!iconRight && icon}
            <span>{text}</span>
            {iconRight && icon}
        </button>
    );
};
