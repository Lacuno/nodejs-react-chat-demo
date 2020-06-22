import React from "react";
import {ClockDisplayOption, Configuration, InterfaceColorOption, SupportedLanguage} from "./App";
import {useTranslation} from "react-i18next";

interface PreferencesProps extends Configuration {
    onUsernameChange: (newUsername: string) => void;
    onInterfaceColorChange: (newInterfaceColor: InterfaceColorOption) => void;
    onClockDisplayChange: (newClockDisplayOption: ClockDisplayOption) => void;
    onSendMessagesOnCtrlEnterChange: (newSendMessageOnCtrlEnter: boolean) => void;
    onLanguageChange: (newLanguage: SupportedLanguage) => void;
}

export function Preferences(props: PreferencesProps) {
    const {t} = useTranslation();

    return <main>
        <h1>{t('prev-header-username')}</h1>
        <input name="usernameInput" value={props.username} onChange={e => props.onUsernameChange(e.target.value)}/>

        <h1>{t('prev-header-interfacecolor')}</h1>
        <input type="radio" name="interface-color-options" value="0"
               checked={props.interfaceColor === InterfaceColorOption.light}
               onChange={() => props.onInterfaceColorChange(InterfaceColorOption.light)}/>
        <label>{t('prev-option-interfacecolor-light')}</label>
        <input type="radio" name="interface-color-options" value="1"
               checked={props.interfaceColor === InterfaceColorOption.dark}
               onChange={() => props.onInterfaceColorChange(InterfaceColorOption.dark)}/>
        <label>{t('prev-option-interfacecolor-dark')}</label>

        <h1>{t('prev-header-clockdisplay')}</h1>
        <input type="radio" name="clock-display-options" value="12h"
               checked={props.clockDisplay === ClockDisplayOption.clock12h}
               onChange={() => props.onClockDisplayChange(ClockDisplayOption.clock12h)}/>
        <label>{t('prev-option-clockdisplay-12h')}</label>
        <input type="radio" name="clock-display-options" value="24h"
               checked={props.clockDisplay === ClockDisplayOption.clock24h}
               onChange={() => props.onClockDisplayChange(ClockDisplayOption.clock24h)}/>
        <label>{t('prev-option-clockdisplay-24h')}</label>

        <h1>{t('prev-header-ctrlenter')}</h1>
        <input type="radio" name="messages-on-ctrl-enter" value="on"
               checked={props.sendMessagesOnCtrlEnter}
               onChange={() => props.onSendMessagesOnCtrlEnterChange(true)}/>
        <label>{t('prev-option-ctrlenter-on')}</label>
        <input type="radio" name="messages-on-ctrl-enter" value="off"
               checked={!props.sendMessagesOnCtrlEnter}
               onChange={() => props.onSendMessagesOnCtrlEnterChange(false)}/>
        <label>{t('prev-option-ctrlenter-off')}</label>

        <h1>{t('prev-header-language')}</h1>
        <select value={props.language}
                onChange={(e) => props.onLanguageChange(e.target.value as SupportedLanguage)}>
            <option value={SupportedLanguage.GERMAN}>Deutsch</option>
            <option value={SupportedLanguage.ENGLISH}>English</option>
        </select>

        <button>{t('prev-button-reset_to_defaults')}</button>
    </main>
}
