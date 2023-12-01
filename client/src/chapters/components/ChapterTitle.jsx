export const ChapterTitle = ({ chaptersLength, activeChapterId, maxNumberOfFreeChapters }) => {
    return (
        <h4 className="chapter__article--title">
            Story (
            <span
                className={`${
                    chaptersLength >= maxNumberOfFreeChapters && activeChapterId === chaptersLength
                        ? "chapter__article--title-subscribe"
                        : ""
                }`}
            >
                part {activeChapterId} / {chaptersLength}
            </span>
            )
        </h4>
    );
};
