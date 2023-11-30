export const ChapterTitle = ({
    chaptersLength,
    activeChapterId,
    maxNumberOfChapters,
    maxNumberOfFreeChapters,
}) => {
    return (
        <h4 className="chapter__article--title">
            Story (
            <span
                className={`${
                    chaptersLength >= maxNumberOfFreeChapters
                        ? "chapter__article--title-subscribe"
                        : ""
                }`}
            >
                part {activeChapterId} / {maxNumberOfChapters}
            </span>
            )
        </h4>
    );
};
