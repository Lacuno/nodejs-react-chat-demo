import * as React from "react";

export interface ChatMessageProps {
    message: string,
    user: string,
    ourMessage: boolean
}

export function ChatMessage(props: ChatMessageProps) {
    let bubbleClass = 'bubble';
    if (props.ourMessage) {
        bubbleClass += ' left-bubble';
    } else {
        bubbleClass += ' right-bubble';
    }


    return <div className={bubbleClass}>
        <div>{props.user}</div>
        <div>{props.message}</div>
    </div>;
}


