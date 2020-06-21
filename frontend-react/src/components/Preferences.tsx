import React from "react";
import {ClockDisplayOption, Configuration, InterfaceColorOption, SupportedLanguage} from "./App";

interface PreferencesProps extends Configuration {
    onUsernameChange: (newUsername: string) => void;
    onInterfaceColorChange: (newInterfaceColor: InterfaceColorOption) => void;
    onClockDisplayChange: (newClockDisplayOption: ClockDisplayOption) => void;
    onSendMessagesOnCtrlEnterChange: (newSendMessageOnCtrlEnter: boolean) => void;
    onLanguageChange: (newLanguage: SupportedLanguage) => void;
}

export function Preferences(props: PreferencesProps) {
    return <main>
        <h1>User name</h1>
        <input name="usernameInput" value={props.username} onChange={e => props.onUsernameChange(e.target.value)}/>

        <h1>Interface color</h1>
        <input type="radio" name="interface-color-options" value="0"
               checked={props.interfaceColor === InterfaceColorOption.light}
               onChange={() => props.onInterfaceColorChange(InterfaceColorOption.light)}/>
        <label>Light</label>
        <input type="radio" name="interface-color-options" value="1"
               checked={props.interfaceColor === InterfaceColorOption.dark}
               onChange={() => props.onInterfaceColorChange(InterfaceColorOption.dark)}/>
        <label>Dark</label>

        <h1>Clock display</h1>
        <input type="radio" name="clock-display-options" value="12h"
               checked={props.clockDisplay === ClockDisplayOption.clock12h}
               onChange={() => props.onClockDisplayChange(ClockDisplayOption.clock12h)}/>
        <label>12 Hours</label>
        <input type="radio" name="clock-display-options" value="24h"
               checked={props.clockDisplay === ClockDisplayOption.clock24h}
               onChange={() => props.onClockDisplayChange(ClockDisplayOption.clock24h)}/>
        <label>24 Hours</label>

        <h1>Send messages on CTRL+Enter</h1>
        <input type="radio" name="messages-on-ctrl-enter" value="on"
               checked={props.sendMessagesOnCtrlEnter}
               onChange={() => props.onSendMessagesOnCtrlEnterChange(true)}/>
        <label>On</label>
        <input type="radio" name="messages-on-ctrl-enter" value="off"
               checked={!props.sendMessagesOnCtrlEnter}
               onChange={() => props.onSendMessagesOnCtrlEnterChange(false)}/>
        <label>Off</label>

        <h1>Language</h1>
        <select>
            <option>Deutsch</option>
            <option>English</option>
        </select>

        <button>Reset to defaults</button>
    </main>
}
