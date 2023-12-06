import "./Textarea.scss";

export const Textarea = ({ placeholder, value, handleChange, isDisabled }) => {
    return (
        <textarea
            className="textarea"
            rows={3}
            disabled={isDisabled}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e.currentTarget.value)}
        />
    );
};
