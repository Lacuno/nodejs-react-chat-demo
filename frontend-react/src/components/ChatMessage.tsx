import * as React from "react";
import {format} from "date-fns"
import {ClockDisplayOption, Configuration, InterfaceColorOption} from "./App";

export interface ChatMessageProps {
    message: string,
    userName: string,
    time: Date,
    ourMessage: boolean
    configuration: Configuration
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

    if(props.configuration.interfaceColor === InterfaceColorOption.dark) {
        bubbleClass += ' darkmode'
    }

    let time;
    if(props.configuration.clockDisplay === ClockDisplayOption.clock12h) {
        time = format(props.time, "HH:mm a");
    } else {
        time = format(props.time, "HH:mm")
    }


    return <div className={bubbleClass}>
        {userNameTag}
        <div>{props.message}</div>
        <div className="display-time">{time}</div>
    </div>;
}


