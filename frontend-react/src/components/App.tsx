import React, {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import {useTranslation} from "react-i18next";
import {Configuration, defaultConfiguration, InterfaceColorOption} from "../domain/Configuration";
import {AppRouter} from "./AppRouter";
import {i18n} from "i18next";
import {handleSendMessageToServer, setupSocketCommunication} from "../server-communication/ServerCommunication";

// Message interface used for our components as state and props
export interface Message {
    username: string,       // Display username
    text: string,           // The message itself
    time: Date,             // Time when the message was sent
    ourMessage: boolean     // Indicates if the message was sent by us (true) or not (false)
}

export interface ChatState {
    messages: Array<Message>,   // All displayed messages
    userId: string,             // A UUID of the user which will be given by the server on connect
}

function setupLanguageChangeDectection(i18next: i18n, configuration: Configuration) {
    useEffect(() => {
        i18next.changeLanguage(configuration.language);
    }, [configuration.language]);
}

function setupInterfaceColorChangeDetection(configuration: Configuration) {
    useEffect(() => {
        if (configuration.interfaceColor === InterfaceColorOption.dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme')
        }
    }, [configuration.interfaceColor]);
}

export function App() {
    const [chatState, setChatState] = useState({
        userId: null,
        messages: []
    } as ChatState);
    const [configuration, setConfiguration] = useState(defaultConfiguration);
    const {i18n} = useTranslation();

    // We need this reference to access the current chatstate in the socket-callbacks inside the effect
    // If we don't use a ref here, we will always access the initial state
    const chatStateRef = useRef<ChatState>();
    chatStateRef.current = chatState;

    const {current: socket} = useRef(io());
    setupSocketCommunication(socket, setChatState, chatStateRef);
    setupLanguageChangeDectection(i18n, configuration);
    setupInterfaceColorChangeDetection(configuration);

    const resetConfiguration = () => {
        setConfiguration(defaultConfiguration);
    }

    return <AppRouter
        configuration={configuration}
        setConfiguration={setConfiguration}
        chatState={chatState}
        onMessageSent={message => handleSendMessageToServer(socket, configuration, message)}
        onResetConfiguration={resetConfiguration}/>;
}
