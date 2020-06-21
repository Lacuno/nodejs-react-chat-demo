import * as React from "react";
import {format} from "date-fns"

export interface ChatMessageProps {
    message: string,
    userName: string,
    time: Date,
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
        userNameTag = <div className="header">{props.userName}</div>;
    }

    console.log('dark_mode: ' + props.darkMode)
    if(props.darkMode) {
        bubbleClass += ' darkmode'
    }
    console.log(props.time);
    console.log(typeof props.time);

    return <div className={bubbleClass}>
        {userNameTag}
        <div>{props.message}</div>
        <div className="display-time">{format(props.time, "HH:mm")}</div>
    </div>;
}


