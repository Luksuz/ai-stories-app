import { useState } from "react";
import "./Chapter.scss";
import { SubscribeFooter } from "./components/SubscribeFooter";
import { RandomEvent } from "./components/RandomEvent";
import { ArticleButtons } from "./components/ArticleButtons";
import { ChapterTitle } from "./components/ChapterTitle";
import { Image } from "./components/Image";

export const Chapter = ({
    image,
    goToPreviousChapter,
    goToNextChapter,
    id,
    content,
    chaptersLength,
    setChapter,
}) => {
    const [randomEvent, setRandomEvent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const maxNumberOfFreeChapters = 5;

    const submitClick = () => {
        generateNextChapter(randomEvent);
    };

    const continueClick = () => {
        setRandomEvent("");
        generateNextChapter("");
    };

    const generateNextChapter = async (newRandomEvent) => {
        setIsLoading(() => true);

        await setChapter(newRandomEvent);

        setIsLoading(() => false);
    };

    const backClick = () => {
        goToPreviousChapter();
    };

    const nextClick = () => {
        goToNextChapter();
    };

    return (
        <section className="chapter">
            <article className="chapter__article">
                <Image image={image} />

                <ChapterTitle
                    chaptersLength={chaptersLength}
                    activeChapterId={id}
                    maxNumberOfFreeChapters={maxNumberOfFreeChapters}
                />

                <p className="chapter__article--content">{content}</p>

                <div className="chapter__article--buttons">
                    <ArticleButtons
                        showSpinner={isLoading && !randomEvent}
                        isDisabled={isLoading}
                        chapterLength={chaptersLength}
                        id={id}
                        content={content}
                        continueClick={continueClick}
                        onBackClick={backClick}
                        onNextClick={nextClick}
                    />
                </div>
            </article>
            <div className="chapter__footer">
                {chaptersLength === maxNumberOfFreeChapters && chaptersLength === id ? (
                    <SubscribeFooter />
                ) : (
                    <RandomEvent
                        showSpinner={isLoading && randomEvent}
                        isDisabled={isLoading}
                        submitClick={submitClick}
                        randomEvent={randomEvent}
                        setRandomEvent={setRandomEvent}
                    />
                )}
            </div>
        </section>
    );
};
