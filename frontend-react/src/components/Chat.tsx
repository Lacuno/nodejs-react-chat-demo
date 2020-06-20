import * as React from "react";
import {ChatMessage, ChatMessageProps} from "./ChatMessage";
import io from "socket.io-client"

interface ChatState {
    messages: Array<ChatMessageProps>,
    inputValue: string
}

export class Chat extends React.Component<{}, ChatState> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [
                {user: 'Chris', message: 'Hello there', ourMessage: true},
                {user: 'Alex', message: 'Hello there', ourMessage: false},
                {user: 'Chris', message: 'Hello there', ourMessage: true}
            ],
            inputValue: ''
        }

        this.handleChange = this.handleChange.bind(this);

        const socket = io('http://localhost:3000');
        socket.on("new-chat-message", (data: ChatMessageProps) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    messages: [...prevState.messages, data]
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

    render() {
        const footerStyle = {
            height: '2em',
            padding: '3px',
        };

        const chatMessages = this.state.messages.map(message => {
            return <ChatMessage user={message.user} message={message.message} ourMessage={message.ourMessage}/>
        });

        return <div className="full-screen column-layout">
            <main className="column-layout stretch overflow-y">
                {chatMessages}
            </main>
            <footer style={footerStyle} className="row-layout">
                <input className="stretch" value={this.state.inputValue} onChange={this.handleChange}/>
                <button onClick={() => this.setState(
                    previousState => ({
                        messages: [...previousState.messages, {
                            user: 'Chris',
                            message: this.state.inputValue,
                            ourMessage: true
                        }]
                    })
                )}>Send
                </button>
            </footer>
        </div>;
    }
}
