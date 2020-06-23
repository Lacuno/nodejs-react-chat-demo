export enum InterfaceColorOption {
    light,
    dark
}

export enum ClockDisplayOption {
    clock12h,
    clock24h
}

export enum SupportedLanguage {
    ENGLISH = 'en',
    GERMAN = 'de'
}

/**
 * Settings of the app
 */
export interface Configuration {
    username: string,                       // Chosen display username
    interfaceColor: InterfaceColorOption,   // Dark or light theme
    clockDisplay: ClockDisplayOption,       // AM/PM vs. 24h mode
    sendMessagesOnCtrlEnter: boolean        // CTRL + Enter will send messages if this flag is set
    language: SupportedLanguage             // Chosen language
}

export const defaultConfiguration = {
    username: `anonymous-${Math.ceil(Math.random() * 99999)}`,
    interfaceColor: InterfaceColorOption.light,
    clockDisplay: ClockDisplayOption.clock12h,
    sendMessagesOnCtrlEnter: true,
    language: SupportedLanguage.ENGLISH
} as Configuration;
