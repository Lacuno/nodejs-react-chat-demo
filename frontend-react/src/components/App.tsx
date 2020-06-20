import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Chat} from "./Chat";
import {Preferences} from "./Preferences";

export default function App() {
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
                        <Preferences />
                    </Route>
                    <Route path="/">
                        <Chat />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
