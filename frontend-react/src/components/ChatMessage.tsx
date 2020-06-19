import * as React from "react";

export interface ChatMessageProps {
    message: string,
    user: string
}

export function ChatMessage(props: ChatMessageProps) {
      return <div className="bubble leftbubblearrow">
        <div>{props.user}</div>
        <div>{props.message}</div>
    </div>;
}


