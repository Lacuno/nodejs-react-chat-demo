import * as React from "react";
import {ChatMessage} from "./ChatMessage";
import {ChatState} from "./App";

export interface ChatUiProps extends ChatState {
    onMessageSent: (message: string) => void
}

interface ChatUiState {
    inputValue: string;
}

export class Chat extends React.Component<ChatUiProps, ChatUiState> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSendMessageToServer = this.handleSendMessageToServer.bind(this);
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

    render() {
        const footerStyle = {
            height: '2em',
            padding: '3px',
        };

        const chatMessages = this.props.messages.map(message => {
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
