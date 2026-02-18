import { DEFAULT_SETTINGS, COOKIE_NAME, LANG_CODES } from "./config.js";
import { setCookie, getCookie } from "./utils.js";

// Simple state management
class StateManager {
    constructor() {
        this.state = { ...DEFAULT_SETTINGS };
        this.isLoading = false;
    }

    get() {
        return this.state;
    }

    set(newState) {
        this.state = { ...this.state, ...newState };
        // Trigger UI update whenever state changes significantly if needed
        // For now, we manually call updateUI() in the controller
    }

    setLoading(loading) {
        this.isLoading = loading;
    }

    save() {
        try {
            // Create a copy to save only necessary fields if needed, 
            // but here we just save the whole state except transient UI things
            const settingsToSave = {
                theme: this.state.theme,
                language: this.state.language,
                languageIndex: this.state.languageIndex,
                lowercase: this.state.lowercase,
                length: this.state.length,
                sincerity: this.state.sincerity,
                misspelling: this.state.misspelling,
                emoji: this.state.emoji,
                punctuation: this.state.punctuation,
                messages: this.state.messages,
                currentIndex: this.state.currentIndex,
            };
            setCookie(COOKIE_NAME, JSON.stringify(settingsToSave), 30); // 30 days
        } catch (error) {
            console.error("Failed to save settings to cookie:", error);
        }
    }

    load() {
        const cookieData = getCookie(COOKIE_NAME);
        if (cookieData) {
            try {
                const savedSettings = JSON.parse(cookieData);
                this.state = { ...DEFAULT_SETTINGS, ...savedSettings };

                // Ensure language index is valid after loading
                const foundIndex = LANG_CODES.indexOf(this.state.language);
                if (foundIndex === -1) {
                    this.state.language = DEFAULT_SETTINGS.language;
                    this.state.languageIndex = DEFAULT_SETTINGS.languageIndex;
                } else {
                    this.state.languageIndex = foundIndex;
                }
            } catch (error) {
                console.error("Failed to parse cookie data, using defaults:", error);
                this.state = { ...DEFAULT_SETTINGS };
            }
        } else {
            this.state = { ...DEFAULT_SETTINGS };
        }
    }
}

export const appState = new StateManager();
