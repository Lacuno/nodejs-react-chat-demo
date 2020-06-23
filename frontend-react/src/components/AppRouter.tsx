import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {ActiveTab} from "../domain/ActiveTab";
import {Preferences} from "./Preferences";
import {Chat} from "./Chat";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Configuration} from "../domain/Configuration";
import {ChatState} from "./App";

export interface AppRouterProps {
    configuration: Configuration,
    setConfiguration: (configuration: Configuration) => void,
    chatState: ChatState,
    onMessageSent: (message: string) => void,
    onResetConfiguration: () => void
}

export function AppRouter(props: AppRouterProps) {
    const [activeTab, setActiveTab] = useState(ActiveTab.Chat);
    const {t} = useTranslation();

    return <Router>
        <div className="full-screen column-layout">
            <nav>
                <ul>
                    <li>
                        <Link to={ActiveTab.Chat}
                              className={activeTab === ActiveTab.Chat ? 'active' : ''}
                              onClick={() => setActiveTab(ActiveTab.Chat)}>{t('nav-chat')}</Link>
                    </li>
                    <li>
                        <Link to={ActiveTab.Preferences}
                              className={activeTab === ActiveTab.Preferences ? 'active' : ''}
                              onClick={() => setActiveTab(ActiveTab.Preferences)}>{t('nav-preferences')}</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path={ActiveTab.Preferences}>
                    <Preferences {...props.configuration}
                                 onUsernameChange={val => props.setConfiguration({
                                     ...props.configuration,
                                     username: val
                                 })}
                                 onInterfaceColorChange={val => props.setConfiguration({
                                     ...props.configuration,
                                     interfaceColor: val
                                 })}
                                 onClockDisplayChange={val => props.setConfiguration({
                                     ...props.configuration,
                                     clockDisplay: val
                                 })}
                                 onSendMessagesOnCtrlEnterChange={val => props.setConfiguration({
                                     ...props.configuration,
                                     sendMessagesOnCtrlEnter: val
                                 })}
                                 onLanguageChange={val => props.setConfiguration({
                                     ...props.configuration,
                                     language: val
                                 })}
                                 onResetConfiguration={props.onResetConfiguration}
                    />
                </Route>
                <Route path={ActiveTab.Chat}>
                    <Chat {...props.chatState}
                          configuration={props.configuration}
                          onMessageSent={props.onMessageSent}/>
                </Route>
            </Switch>
        </div>
    </Router>;
}
