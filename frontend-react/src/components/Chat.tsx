import * as React from "react";

export class Chat extends React.Component {
    render() {
        const fullStyle = {
            width: '100%',
            height: 'calc(100vh - 18px)',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column' as 'column'
        };
        const mainStyle = {
            flex: 1
        };
        const footerStyle = {
            height: '2em',
            padding: '3px',
            display: 'flex'
        };
        const inputStyle = {
            flex: 1,
        }

        return <div style={fullStyle}>
            <main style={mainStyle}>
            </main>
            <footer style={footerStyle}>
                <input style={inputStyle}/>
                <button>Send</button>
            </footer>
        </div>;
    }
}
