import { useContext, useEffect, useState } from "react";
import "./Chapter.scss";
import { StoryContext } from "../context/StoryContext";
import { fetchImage, fetchStory } from "../utils/ApiService";
import { SubscribeFooter } from "./components/SubscribeFooter";
import { RandomEvent } from "./components/RandomEvent";
import { ArticleButtons } from "./components/ArticleButtons";
import { ChapterTitle } from "./components/ChapterTitle";
import { Image } from "./components/Image";

export const Chapter = ({ activeChapter }) => {
    const { story, setStory } = useContext(StoryContext);
    const [randomEvent, setRandomEvent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chaptersLength = story.chapters.length;
    const maxNumberOfChapters = 5;
    const maxNumberOfFreeChapters = 5;

    useEffect(() => {
        if (!activeChapter.image) {
            getImage();
        }
    }, []);

    const getImage = async () => {
        const image = await fetchImage(activeChapter.imagePrompt);
        setStory({
            ...story,
            chapters: [
                ...story.chapters,
                {
                    ...activeChapter,
                    image: image,
                },
            ],
        });
    };

    const submitClick = () => {
        generateNextChapter();
    };

    const continueClick = () => {
        setRandomEvent(() => "");
        generateNextChapter();
    };

    const generateNextChapter = async () => {
        setIsLoading(() => true);

        const nextActiveChapter = activeChapter.id + 1;

        const data = await fetchStory(
            activeChapter.storyData.synopsis,
            activeChapter.storyData.content,
            ["part " + nextActiveChapter, "part " + activeChapter.id],
            randomEvent,
            ""
        );

        setStory({
            userPrompt: "",
            activeChapterId: nextActiveChapter,
            chapters: [
                ...story.chapters,
                {
                    id: nextActiveChapter,
                    message: data.message,
                    imagePrompt: data.imagePrompt,
                    storyData: {
                        title: story.chapters[0].storyData[0],
                        synopsis: story.chapters[0].storyData[1],
                        content: data.storyData,
                    },
                },
            ],
        });

        setIsLoading(() => false);
    };

    return (
        <section className="chapter">
            <article className="chapter__article">
                <Image image={activeChapter.image} />

                <ChapterTitle
                    chaptersLength={chaptersLength}
                    activeChapterId={activeChapter.id}
                    maxNumberOfChapters={maxNumberOfChapters}
                    maxNumberOfFreeChapters={maxNumberOfFreeChapters}
                />

                <p className="chapter__article--content">{activeChapter.storyData.content}</p>

                <div className="chapter__article--buttons">
                    <ArticleButtons
                        isLoading={isLoading && !randomEvent}
                        chapterLength={chaptersLength}
                        content={activeChapter.storyData.content}
                        continueClick={continueClick}
                    />
                </div>
            </article>
            <div className="chapter__footer">
                {chaptersLength < maxNumberOfFreeChapters ? (
                    <RandomEvent
                        isLoading={isLoading && randomEvent}
                        submitClick={submitClick}
                        randomEvent={randomEvent}
                        setRandomEvent={setRandomEvent}
                    />
                ) : (
                    <SubscribeFooter />
                )}
            </div>
        </section>
    );
};
