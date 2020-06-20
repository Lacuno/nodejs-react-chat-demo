import React from "react";

export function Preferences() {
    return <main>
        <h1>User name</h1>
        <input name="usernameInput"/>

        <h1>Interface color</h1>
        <input type="radio" name="interface-color-options" value="light"/>
        <label>Light</label>
        <input type="radio" name="interface-color-options" value="dark"/>
        <label>Dark</label>

        <h1>Clock display</h1>
        <input type="radio" name="clock-display-options" value="12h"/>
        <label>12 Hours</label>
        <input type="radio" name="clock-display-options" value="24h"/>
        <label>24 Hours</label>

        <h1>Send messages on CTRL+Enter</h1>
        <input type="radio" name="messages-on-ctrl-enter" value="on"/>
        <label>On</label>
        <input type="radio" name="messages-on-ctrl-enter" value="off"/>
        <label>Off</label>

        <h1>Language</h1>
        <select>
            <option>Deutsch</option>
            <option>English</option>
        </select>

        <button>Reset to defaults</button>
    </main>
}
