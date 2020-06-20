import * as React from "react";
import {ChatMessage, ChatMessageProps} from "./ChatMessage";
import io from "socket.io-client"

interface ChatState {
    messages: Array<ChatMessageProps>,
    userId: string,
    userName: string,
    inputValue: string
}

interface ChatMessageForServer {
    fromId: string,     // Id of the user who sent the message
    userName: string    // UserName of the user who sent the message (= display name)
    message: string     // The message itself
}

export class Chat extends React.Component<{}, ChatState> {
    private socket: SocketIOClient.Socket;

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
            userId: null,
            userName: null,
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSendMessageToServer = this.handleSendMessageToServer.bind(this);

        this.socket = io('http://localhost:3000');
        this.socket.on('new-user-id', (newUserId: string) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    userId: newUserId,
                    userName: `anonymous-${Math.ceil(Math.random() * 99999)}`
                }
            })
        });
        this.socket.on("new-chat-message", (newChatMessage: ChatMessageForServer) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    messages: [...prevState.messages, {
                        ourMessage: this.state.userId === newChatMessage.fromId,
                        userName: newChatMessage.userName,
                        message: newChatMessage.message
                    }]
                };
            })
        });
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
        this.socket.emit('new-chat-message-to-server', {
            userName: this.state.userName,
            message: this.state.inputValue,
        });
        this.setState(prevState => {
            return {
                ...prevState,
                inputValue: ''
            }
        })
    }

    render() {
        const footerStyle = {
            height: '2em',
            padding: '3px',
        };

        const chatMessages = this.state.messages.map(message => {
            return <ChatMessage userName={message.userName} message={message.message} ourMessage={message.ourMessage}/>
        });

        return <div className="full-screen column-layout">
            <main className="column-layout stretch overflow-y">
                {chatMessages}
            </main>
            <footer style={footerStyle} className="row-layout">
                <input className="stretch" value={this.state.inputValue} onChange={this.handleChange}/>
                <button onClick={this.handleSendMessageToServer}>Send</button>
            </footer>
        </div>;
    }
}
