import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Chat} from "./Chat";
import {Preferences} from "./Preferences";
import io from "socket.io-client";
import {useTranslation} from "react-i18next";
import {ClockDisplayOption, Configuration, InterfaceColorOption, SupportedLanguage} from "../domain/Configuration";
import {ChatMessageForServer, ChatMessageFromServer} from "../domain/ServerCommunication";
import {ActiveTab} from "../domain/ActiveTab";

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

const defaultConfiguration = {
    username: `anonymous-${Math.ceil(Math.random() * 99999)}`,
    interfaceColor: InterfaceColorOption.light,
    clockDisplay: ClockDisplayOption.clock12h,
    sendMessagesOnCtrlEnter: true,
    language: SupportedLanguage.ENGLISH
} as Configuration;

export function App() {
    const [chatState, setChatState] = useState({
        userId: null,
        messages: []
    } as ChatState);
    const [configuration, setConfiguration] = useState(defaultConfiguration);
    const [activeTab, setActiveTab] = useState(ActiveTab.Chat);

    // We need this reference to access the current chatstate in the socket-callbacks inside the effect
    // If we don't use a ref here, we will always access the initial state
    const chatStateRef = useRef<ChatState>();
    chatStateRef.current = chatState;

    // Socket communication
    const {current: socket} = useRef(io());
    useEffect(() => {
        // On connect the server will assign a new UUID to the connecting user
        // Since we broadcast the messages this id then indicates if the message belonged to us or not
        socket.on('new-user-id', (newUserId: string) => {
            setChatState({
                ...chatStateRef.current,
                userId: newUserId
            });
        });
        // New chat message arrives -> add it to the others
        socket.on('new-chat-message', (messageFromServer: ChatMessageFromServer) => {
            const message = {
                username: messageFromServer.username,
                text: messageFromServer.text,
                time: new Date(messageFromServer.time),
                ourMessage: chatStateRef.current.userId === messageFromServer.fromId,
            } as Message;
            setChatState({
                ...chatStateRef.current,
                messages: [...chatStateRef.current.messages, message]
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
    }, [configuration.interfaceColor]);


    const handleSendMessageToServer = (message: string) => {
        socket.emit('new-chat-message-to-server', {
            username: configuration.username,
            time: new Date(),
            text: message,
        } as ChatMessageForServer);
    }

    const {t, i18n} = useTranslation();

    const resetConfiguration = () => {
        setConfiguration(defaultConfiguration);
    }

    return (
        <Router>
            <div className="full-screen column-layout">
                <nav>
                    <ul>
                        <li>
                            <Link to={ActiveTab.Chat}
                                  className={activeTab === ActiveTab.Chat ? 'active' : ''}
                                  onClick={() => setActiveTab(ActiveTab.Chat)}>{t('nav-chat')}</Link>
                        </li>
                        <li>
                            <Link to={ActiveTab.Preferences}
                                  className={activeTab === ActiveTab.Preferences ? 'active' : ''}
                                  onClick={() => setActiveTab(ActiveTab.Preferences)}>{t('nav-preferences')}</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path={ActiveTab.Preferences}>
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
                    <Route path={ActiveTab.Chat}>
                        <Chat {...chatState}
                              configuration={configuration}
                              onMessageSent={handleSendMessageToServer}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
