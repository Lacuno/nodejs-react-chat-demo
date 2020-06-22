import * as React from "react";
import {ChatMessage} from "./ChatMessage";
import {ChatState, Configuration, Message} from "./App";

export interface ChatUiProps extends ChatState {
    configuration: Configuration,
    onMessageSent: (message: string) => void
}

interface ChatUiState {
    inputValue: string;
}

export class Chat extends React.Component<ChatUiProps, ChatUiState> {
    private messagesEnd: HTMLDivElement;

    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSendMessageToServer = this.handleSendMessageToServer.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        this.setState(prevState => {
            return {
                ...prevState,
                inputValue: value
            }
        })
    }

    handleSendMessageToServer() {
        if (!this.state.inputValue) {
            return;
        }
        this.props.onMessageSent(this.state.inputValue);
        this.setState(prevState => {
            return {
                ...prevState,
                inputValue: ''
            }
        });
    }

    keyDownHandler(event: React.KeyboardEvent) {
        const onCtrlEnter = event.ctrlKey && event.keyCode === 13;
        if (this.props.configuration.sendMessagesOnCtrlEnter && onCtrlEnter) {
            this.handleSendMessageToServer();
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const footerStyle = {
            height: '2em',
            padding: '3px',
        };

        const chatMessages = this.props.messages.map((message: Message, idx) => {
            return <ChatMessage key={idx}
                                time={message.time}
                                userName={message.username}
                                ourMessage={message.ourMessage}
                                message={message.text}
                                configuration={this.props.configuration}/>
        });

        return <div className="column-layout stretch">
            <main className="column-layout stretch overflow-y">
                <p>
                    Welcome to our chat. Everybody who is connected to this chat will read your messages. Enjoy!
                </p>
                {chatMessages}
                <div id="dummy" ref={(el) => {
                    this.messagesEnd = el;
                }}/>
            </main>
            <footer style={footerStyle} className="row-layout">
                <input className="stretch" value={this.state.inputValue}
                       onChange={this.handleChange}
                       onKeyDown={this.keyDownHandler}/>
                <button onClick={this.handleSendMessageToServer}>Send
                </button>
            </footer>
        </div>;
    }
}
