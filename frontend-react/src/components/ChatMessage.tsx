import * as React from "react";

export interface ChatMessageProps {
    message: string,
    userName: string,
    ourMessage: boolean
}

export function ChatMessage(props: ChatMessageProps) {
    let bubbleClass = 'bubble';
    let userNameTag;
    if (props.ourMessage) {
        bubbleClass += ' right-bubble';
    } else {
        bubbleClass += ' left-bubble';
        userNameTag = <div>{props.userName}</div>;
    }

    return <div className={bubbleClass}>
        {userNameTag}
        <div>{props.message}</div>
    </div>;
}


