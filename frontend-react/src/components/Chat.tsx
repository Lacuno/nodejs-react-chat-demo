import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage";
import {ChatState, Message} from "./App";
import {Configuration} from "../domain/Configuration";
import {useTranslation} from "react-i18next";

export interface ChatUiProps extends ChatState {
    configuration: Configuration,
    onMessageSent: (message: string) => void
}

export function Chat(props: ChatUiProps) {
    const [inputValue, setInputValue] = useState('');
    const {t} = useTranslation();

    // This reference to a div on the bottom of the chat messages it used to scroll to it whenever a new message arrives
    const chatmessageEnd = useRef<HTMLDivElement>(null);
    useEffect(() => {
        chatmessageEnd.current.scrollIntoView({behavior: "smooth"});
    }, [props.messages]);

    const handleSendMessageToServer = () => {
        if (!inputValue) {
            return;
        }
        props.onMessageSent(inputValue);
        setInputValue('');
    }

    const keyDownHandler = (event: React.KeyboardEvent) => {
        const onCtrlEnter = event.ctrlKey && event.keyCode === 13;
        if (props.configuration.sendMessagesOnCtrlEnter && onCtrlEnter) {
            handleSendMessageToServer();
        }
    }

    const chatMessages = props.messages.map((message: Message, idx) => {
        return <ChatMessage key={idx}
                            time={message.time}
                            userName={message.username}
                            ourMessage={message.ourMessage}
                            message={message.text}
                            configuration={props.configuration}/>
    });

    return <div className="column-layout stretch">
        <main className="column-layout stretch overflow-y">
            <p>
                {t('chat-welcome-message')}
            </p>
            {chatMessages}
            <div id="dummy" ref={chatmessageEnd}/>
        </main>
        <footer className="row-layout">
            <input className="stretch" value={inputValue}
                   onChange={event => setInputValue(event.target.value)}
                   onKeyDown={keyDownHandler}/>
            <button onClick={handleSendMessageToServer}>{t('chat-button-send')}</button>
        </footer>
    </div>;
}
