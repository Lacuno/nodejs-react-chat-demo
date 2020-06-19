import * as React from "react";
import {ChatMessage, ChatMessageProps} from "./ChatMessage";

interface ChatState {
    messages: Array<ChatMessageProps>
}

export class Chat extends React.Component<{}, ChatState> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [{user: 'Chris', message: 'Hello there'}, {user: 'Chris', message: 'Hello there'}, {
                user: 'Chris',
                message: 'Hello there'
            }]
        }
    }


    render() {
        const footerStyle = {
            height: '2em',
            padding: '3px',
        };

        const chatMessages = this.state.messages.map(message => {
            return <ChatMessage user={message.user} message={message.message}/>
        });

        return <div className="full-screen column-layout">
            <main className="column-layout stretch overflow-y">
                {chatMessages}
            </main>
            <footer style={footerStyle} className="row-layout">
                <input className="stretch"/>
                <button onClick={() => this.setState(
                    previousState => ({
                        messages: [...previousState.messages, {user: 'Chris', message: 'Hello there'}]
                    })
                )}>Send
                </button>
            </footer>
        </div>;
    }
}
