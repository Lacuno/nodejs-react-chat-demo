import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Chat} from "./Chat";
import {Preferences} from "./Preferences";
import io from "socket.io-client";
import {useTranslation} from "react-i18next";

export interface ChatMessageForServer {
    fromId: string,     // Id of the user who sent the message
    userName: string    // UserName of the user who sent the message (= display name)
    message: string     // The message itself
    timestamp: Date     // Time when the message was published
}

export interface Configuration {
    username: string,
    interfaceColor: InterfaceColorOption,
    clockDisplay: ClockDisplayOption,
    sendMessagesOnCtrlEnter: boolean
    language: SupportedLanguage
}

export enum InterfaceColorOption {
    light,
    dark
}

export enum ClockDisplayOption {
    clock12h,
    clock24h
}

export enum SupportedLanguage {
    ENGLISH = 'en',
    GERMAN = 'de'
}

export interface ChatState {
    messages: Array<Message>,
    userId: string,
}

export interface Message {
    username: string,
    text: string,
    time: Date,
    ourMessage: boolean
}

export function App() {
    const [chatState, setChatState] = useState({
        userId: null,
        messages: []
    } as ChatState);
    const [configuration, setConfiguration] = useState({
        username: `anonymous-${Math.ceil(Math.random() * 99999)}`,
        interfaceColor: InterfaceColorOption.light,
        clockDisplay: ClockDisplayOption.clock12h,
        sendMessagesOnCtrlEnter: true,
        language: SupportedLanguage.ENGLISH
    } as Configuration);

    // We need this reference to access the current chatstate in the socket-callbacks inside the effect
    // If we don't use a ref here, we will always access the initial state
    const chatStateRef = useRef<ChatState>();
    chatStateRef.current = chatState;

    const {current: socket} = useRef(io('http://localhost:3000'));
    useEffect(() => {
        socket.on('new-user-id', (newUserId: string) => {
            setChatState({
                ...chatStateRef.current,
                userId: newUserId
            });
        });
        socket.on('new-chat-message', (newChatMessage: any) => {
            newChatMessage.time = new Date(newChatMessage.time);
            newChatMessage.ourMessage = chatStateRef.current.userId === newChatMessage.fromId;
            setChatState({
                ...chatStateRef.current,
                messages: [...chatStateRef.current.messages, newChatMessage]
            });
        });
        return () => {
            socket.close();
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(configuration.language);
    }, [configuration.language]);

    useEffect(() => {
        if (configuration.interfaceColor === InterfaceColorOption.dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme')
        }
    }, [configuration.interfaceColor])


    const handleSendMessageToServer = (message: string) => {
        socket.emit('new-chat-message-to-server', {
            username: configuration.username,
            time: new Date(),
            text: message,
        });
    }

    const {t, i18n} = useTranslation();

    const resetConfiguration = () => {
        setConfiguration({
            username: `anonymous-${Math.ceil(Math.random() * 99999)}`,
            interfaceColor: InterfaceColorOption.light,
            clockDisplay: ClockDisplayOption.clock12h,
            sendMessagesOnCtrlEnter: true,
            language: SupportedLanguage.ENGLISH
        } as Configuration);
    }

    return (
        <Router>
            <div className="full-screen column-layout">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">{t('nav-chat')}</Link>
                        </li>
                        <li>
                            <Link to="/preferences">{t('nav-preferences')}</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/preferences">
                        <Preferences {...configuration}
                                     onUsernameChange={val => setConfiguration({...configuration, username: val})}
                                     onInterfaceColorChange={val => setConfiguration({
                                         ...configuration,
                                         interfaceColor: val
                                     })}
                                     onClockDisplayChange={val => setConfiguration({
                                         ...configuration,
                                         clockDisplay: val
                                     })}
                                     onSendMessagesOnCtrlEnterChange={val => setConfiguration({
                                         ...configuration,
                                         sendMessagesOnCtrlEnter: val
                                     })}
                                     onLanguageChange={val => setConfiguration({...configuration, language: val})}
                                     onResetConfiguration={resetConfiguration}
                        />
                    </Route>
                    <Route path="/">
                        <Chat {...chatState}
                              configuration={configuration}
                              onMessageSent={handleSendMessageToServer}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
