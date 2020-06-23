import {Configuration, defaultConfiguration} from "../domain/Configuration";

export function getSavedConfiguration(): Configuration {
    const storedValue = localStorage.getItem('configuration');
    if (storedValue) {
        return {
            ...defaultConfiguration,
            ...JSON.parse(storedValue)
        } as Configuration;
    }
    return defaultConfiguration;
}

export function saveConfiguration(configuration: Configuration) {
    localStorage.setItem('configuration', JSON.stringify(configuration));
}
