import React from "react";
import {useTranslation} from "react-i18next";
import {ClockDisplayOption, Configuration, InterfaceColorOption, SupportedLanguage} from "../domain/Configuration";

interface PreferencesProps extends Configuration {
    onUsernameChange: (newUsername: string) => void;
    onInterfaceColorChange: (newInterfaceColor: InterfaceColorOption) => void;
    onClockDisplayChange: (newClockDisplayOption: ClockDisplayOption) => void;
    onSendMessagesOnCtrlEnterChange: (newSendMessageOnCtrlEnter: boolean) => void;
    onLanguageChange: (newLanguage: SupportedLanguage) => void;
    onResetConfiguration: () => void;
}

export function Preferences(props: PreferencesProps) {
    const {t} = useTranslation();

    return <main className="container">
        <h1>{t('prev-header-username')}</h1>
        <input name="usernameInput" value={props.username} onChange={e => props.onUsernameChange(e.target.value)}/>

        <h1>{t('prev-header-interfacecolor')}</h1>
        <div className="row-layout">
            <input type="radio" id="interface-color-options-light" value="0"
                   checked={props.interfaceColor === InterfaceColorOption.light}
                   onChange={() => props.onInterfaceColorChange(InterfaceColorOption.light)}/>
            <label htmlFor="interface-color-options-light">{t('prev-option-interfacecolor-light')}</label>
            <input type="radio" id="interface-color-options-dark" value="1"
                   checked={props.interfaceColor === InterfaceColorOption.dark}
                   onChange={() => props.onInterfaceColorChange(InterfaceColorOption.dark)}/>
            <label htmlFor="interface-color-options-dark">{t('prev-option-interfacecolor-dark')}</label>
        </div>

        <h1>{t('prev-header-clockdisplay')}</h1>
        <div className="row-layout">
            <input type="radio" id="clock-display-options-12h" value="12h"
                   checked={props.clockDisplay === ClockDisplayOption.clock12h}
                   onChange={() => props.onClockDisplayChange(ClockDisplayOption.clock12h)}/>
            <label htmlFor="clock-display-options-12h">{t('prev-option-clockdisplay-12h')}</label>
            <input type="radio" id="clock-display-options-24h" value="24h"
                   checked={props.clockDisplay === ClockDisplayOption.clock24h}
                   onChange={() => props.onClockDisplayChange(ClockDisplayOption.clock24h)}/>
            <label htmlFor="clock-display-options-24h">{t('prev-option-clockdisplay-24h')}</label>
        </div>

        <h1>{t('prev-header-ctrlenter')}</h1>
        <div className="row-layout">
            <input type="radio" id="messages-on-ctrl-enter-on" value="on"
                   checked={props.sendMessagesOnCtrlEnter}
                   onChange={() => props.onSendMessagesOnCtrlEnterChange(true)}/>
            <label htmlFor="messages-on-ctrl-enter-on">{t('prev-option-ctrlenter-on')}</label>
            <input type="radio" id="messages-on-ctrl-enter-off" value="off"
                   checked={!props.sendMessagesOnCtrlEnter}
                   onChange={() => props.onSendMessagesOnCtrlEnterChange(false)}/>
            <label htmlFor="messages-on-ctrl-enter-off">{t('prev-option-ctrlenter-off')}</label>
        </div>

        <h1>{t('prev-header-language')}</h1>
        <div className="row-layout">
            <select value={props.language}
                    onChange={(e) => props.onLanguageChange(e.target.value as SupportedLanguage)}>
                <option value={SupportedLanguage.GERMAN}>Deutsch</option>
                <option value={SupportedLanguage.ENGLISH}>English</option>
            </select>
        </div>

        <button onClick={props.onResetConfiguration}>{t('prev-button-reset_to_defaults')}</button>
    </main>
}
