import * as React from "react";

export interface ChatMessageProps {
    message: string,
    userName: string,
    ourMessage: boolean
    darkMode: boolean
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

    console.log('dark_mode: ' + props.darkMode)
    if(props.darkMode) {
        bubbleClass += ' darkmode'
    }

    return <div className={bubbleClass}>
        {userNameTag}
        <div>{props.message}</div>
    </div>;
}


