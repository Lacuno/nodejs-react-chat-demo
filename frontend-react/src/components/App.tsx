import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Chat} from "./Chat";
import {Preferences} from "./Preferences";
import {ChatMessageProps} from "./ChatMessage";
import io from "socket.io-client";

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
    ENGLISH,
    GERMAN
}

export interface ChatState {
    messages: Array<ChatMessageProps>,
    userId: string,
}

interface AppState {
    chatState: ChatState,
    configuration: Configuration
}

export class App extends React.Component<{}, AppState> {
    private socket: SocketIOClient.Socket;

    constructor(props: any) {
        super(props);

        this.state = {
            chatState: {
                userId: null,
                messages: []
            },
            configuration: {
                username: `anonymous-${Math.ceil(Math.random() * 99999)}`,
                interfaceColor: InterfaceColorOption.light,
                clockDisplay: ClockDisplayOption.clock12h,
                sendMessagesOnCtrlEnter: true,
                language: SupportedLanguage.ENGLISH
            }
        }

        this.socket = io('http://localhost:3000');
        this.socket.on('new-user-id', (newUserId: string) => {
            this.setState({
                chatState: {
                    ...this.state.chatState,
                    userId: newUserId
                }
            });
        });
        this.socket.on("new-chat-message", (newChatMessage: any) => {
            newChatMessage.time = new Date(newChatMessage.time);
            newChatMessage.ourMessage = this.state.chatState.userId === newChatMessage.fromId;
            newChatMessage = {
                ...newChatMessage,
                configuration: this.state.configuration
            }
            this.setState({
                chatState: {
                    ...this.state.chatState,
                    messages: [...this.state.chatState.messages, newChatMessage]
                }
            })
        });

        this.handleSendMessageToServer = this.handleSendMessageToServer.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setInterfaceColor = this.setInterfaceColor.bind(this);
        this.setClockDisplay = this.setClockDisplay.bind(this);
        this.setSendMessageOnCtrlEnter = this.setSendMessageOnCtrlEnter.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    }

    handleSendMessageToServer(message: string) {
        this.socket.emit('new-chat-message-to-server', {
            userName: this.state.configuration.username,
            time: new Date(),
            message: message,
        });
    }

    setUsername(newUsername: string) {
        this.setState(
            {
                configuration: {
                    ...this.state.configuration,
                    username: newUsername
                }
            }
        )
    }

    setInterfaceColor(newInterfaceColor: InterfaceColorOption) {
        this.setState(
            {
                configuration: {
                    ...this.state.configuration,
                    interfaceColor: newInterfaceColor
                }
            }
        );

        if(newInterfaceColor === InterfaceColorOption.dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            console.log('dark')
        } else {
            document.documentElement.removeAttribute('data-theme')
        }

    }

    setClockDisplay(newClockDisplay: ClockDisplayOption) {
        this.setState(
            {
                configuration: {
                    ...this.state.configuration,
                    clockDisplay: newClockDisplay
                }
            }
        )
    }

    setSendMessageOnCtrlEnter(newSendMessageOnCtrlEnter: boolean) {
        this.setState(
            {
                configuration: {
                    ...this.state.configuration,
                    sendMessagesOnCtrlEnter: newSendMessageOnCtrlEnter
                }
            }
        )
    }

    setLanguage(newLanguage: SupportedLanguage) {
        this.setState({
            configuration: {
                ...this.state.configuration,
                language: newLanguage
            }
        })
    }

    render() {
        return (
            <Router>
                <div className="full-screen column-layout">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Chat</Link>
                            </li>
                            <li>
                                <Link to="/preferences">Preferences</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/preferences">
                            <Preferences {...this.state.configuration}
                                         onUsernameChange={this.setUsername}
                                         onInterfaceColorChange={this.setInterfaceColor}
                                         onClockDisplayChange={this.setClockDisplay}
                                         onSendMessagesOnCtrlEnterChange={this.setSendMessageOnCtrlEnter}
                                         onLanguageChange={this.setLanguage}
                            />
                        </Route>
                        <Route path="/">
                            <Chat {...this.state.chatState}
                                  {...this.state.configuration}
                                  onMessageSent={this.handleSendMessageToServer}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
