import { BackButton } from "../../button/BackButton";
import { CopyButton } from "../../button/CopyButton";
import { GenerateButton } from "../../button/GenerateButton";
import { NextButton } from "../../button/NextButton";
import { Spinner } from "../../spinner/Spinner";

export const ArticleButtons = ({
    content,
    continueClick,
    onBackClick,
    onNextClick,
    isDisabled,
    showSpinner,
    id,
    chapterLength,
}) => {
    return (
        <>
            <div className="chapter__article--buttons-spinner">
                <CopyButton
                    text="Copy"
                    handleClick={() => navigator.clipboard.writeText(content)}
                />
                {chapterLength > 1 && (
                    <BackButton
                        text="Back"
                        handleClick={onBackClick}
                        isDisabled={isDisabled || id === 1}
                    />
                )}
            </div>
            <div className="chapter__article--buttons-spinner">
                {chapterLength > 1 && (
                    <NextButton
                        text="Next"
                        handleClick={onNextClick}
                        isDisabled={isDisabled || id === chapterLength}
                    />
                )}
                {showSpinner && <Spinner />}
                <GenerateButton
                    text="Continue"
                    handleClick={continueClick}
                    isDisabled={isDisabled || chapterLength >= 5}
                />
            </div>
        </>
    );
};
