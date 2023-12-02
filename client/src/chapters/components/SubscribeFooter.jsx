import { SubscribeButton } from "../../button/SubscribeButton";

export const SubscribeFooter = () => {
    return (
        <div className="chapter__footer--subscribe">
            <span>You have used all the stories, for unlimited generation - subscribe</span>
            <SubscribeButton text="Subscribe" />
        </div>
    );
};
