import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from "./components/App";
import {initReactI18next} from "react-i18next";
import i18next from "i18next";

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                'nav-chat': 'Chat',
                'nav-preferences': 'Preferences',
                'prev-header-username': 'Username',
                'prev-header-interfacecolor': 'Interface color',
                'prev-header-clockdisplay': 'Clock display',
                'prev-header-ctrlenter': 'Send messages on CTRL+Enter',
                'prev-header-language': 'Language',
                'prev-option-interfacecolor-light': 'Light',
                'prev-option-interfacecolor-dark': 'Dark',
                'prev-option-clockdisplay-12h': '12 Hours',
                'prev-option-clockdisplay-24h': '24 Hours',
                'prev-option-ctrlenter-on': 'On',
                'prev-option-ctrlenter-off': 'Off',
                'prev-button-reset_to_defaults': 'Reset to defaults'
            }
        },
        de: {
            translation: {
                'nav-chat': 'Chat',
                'nav-preferences': 'Einstellungen',
                'prev-header-username': 'Benutzername',
                'prev-header-interfacecolor': 'Farbeinstellung',
                'prev-header-clockdisplay': 'Zeitformat',
                'prev-header-ctrlenter': 'Nachrichten mit Strg+Enter schicken',
                'prev-header-language': 'Sprache',
                'prev-option-interfacecolor-light': 'Hell',
                'prev-option-interfacecolor-dark': 'Dunkel',
                'prev-option-clockdisplay-12h': '12 Stunden',
                'prev-option-clockdisplay-24h': '24 Stunden',
                'prev-option-ctrlenter-on': 'An',
                'prev-option-ctrlenter-off': 'Aus',
                'prev-button-reset_to_defaults': 'Zurücksetzen'
            }
        }
    },
    lng: 'en',
    fallbackLng: 'en',

    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
