import React, {useState} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Chat} from "./Chat";
import {Preferences} from "./Preferences";

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

export default function App() {
    const [username, setUsername] = useState('test');
    const [interfaceColor, setInterfaceColor] = useState(InterfaceColorOption.light);
    const [clockDisplay, setClockDisplay] = useState(ClockDisplayOption.clock12h);
    const [sendMessageOnCtrlEnter, setSendMessageOnCtrlEnter] = useState(true)
    const [language, setLanguage] = useState(SupportedLanguage.ENGLISH);

    return (
        <Router>
            <div>
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
                        <Preferences
                            username={username}
                            onUsernameChange={setUsername}
                            interfaceColor={interfaceColor}
                            onInterfaceColorChange={setInterfaceColor}
                            clockDisplay={clockDisplay}
                            onClockDisplayChange={setClockDisplay}
                            sendMessagesOnCtrlEnter={sendMessageOnCtrlEnter}
                            onSendMessagesOnCtrlEnterChange={setSendMessageOnCtrlEnter}
                            language={language}
                            onLanguageChange={setLanguage}
                        />
                    </Route>
                    <Route path="/">
                        <Chat/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
