import * as React from "react";

export class Chat extends React.Component {
    render() {
        const footerStyle = {
            height: '2em',
            padding: '3px',
        };

        const messages: Array<ChatMessageProps> = [{user: 'Chris', message: 'Hello there'}, {user: 'Chris', message: 'Hello there'}, {user: 'Chris', message: 'Hello there'}];
        const chatMessages = messages.map(message => {
            return <ChatMessage user={message.user} message={message.message} />
        });

        return <div className="full-screen column-layout">
            <main className="column-layout stretch">
                {chatMessages}
            </main>
            <footer style={footerStyle} className="row-layout">
                <input className="stretch"/>
                <button>Send</button>
            </footer>
        </div>;
    }
}
