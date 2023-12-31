export const Image = ({ image }) => {
    return (
        <>
            {image ? (
                <img src={image} className="chapter__article--image" alt="Describes the chapter" />
            ) : (
                <div role="status" className="chapter__article--loader">
                    <div className="chapter__article--loader-item"></div>
                </div>
            )}
        </>
    );
};
