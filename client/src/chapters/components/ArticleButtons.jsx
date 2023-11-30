import { CopyButton } from "../../button/CopyButton";
import { GenerateButton } from "../../button/GenerateButton";
import { Spinner } from "../../spinner/Spinner";

export const ArticleButtons = ({ content, continueClick, isLoading, chapterLength }) => {
    return (
        <>
            <CopyButton text="Copy" handleClick={() => navigator.clipboard.writeText(content)} />
            <div className="chapter__article--buttons-spinner">
                {isLoading && <Spinner />}
                <GenerateButton
                    text="Continue"
                    handleClick={continueClick}
                    isDisabled={isLoading || chapterLength >= 5}
                />
            </div>
        </>
    );
};
