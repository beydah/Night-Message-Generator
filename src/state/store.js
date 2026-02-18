import { DEFAULT_SETTINGS, COOKIE_NAME, LANG_CODES } from "../config/app_config.js";
import { F_Set_Cookie, F_Get_Cookie } from "../utils/helpers.js";

//#region State Management

// Simple state management
export class C_State_Manager {
    constructor() {
        this.state = { ...DEFAULT_SETTINGS };
        this.is_loading = false;
    }

    //#region F_Get
    F_Get() {
        return this.state;
    }
    //#endregion

    //#region F_Set
    F_Set(p_new_state) {
        this.state = { ...this.state, ...p_new_state };
        // Trigger UI update whenever state changes significantly if needed
        // For now, we manually call updateUI() in the controller
    }
    //#endregion

    //#region F_Set_Loading
    F_Set_Loading(p_loading) {
        this.is_loading = p_loading;
    }
    //#endregion

    //#region F_Save
    F_Save() {
        try {
            // Create a copy to save only necessary fields if needed, 
            // but here we just save the whole state except transient UI things
            const settings_to_save = {
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
            F_Set_Cookie(COOKIE_NAME, JSON.stringify(settings_to_save), 30); // 30 days
        } catch (error) {
            console.error("Failed to save settings to cookie:", error);
        }
    }
    //#endregion

    //#region F_Load
    F_Load() {
        const cookie_data = F_Get_Cookie(COOKIE_NAME);
        if (cookie_data) {
            try {
                const saved_settings = JSON.parse(cookie_data);
                this.state = { ...DEFAULT_SETTINGS, ...saved_settings };

                // Ensure language index is valid after loading
                const found_index = LANG_CODES.indexOf(this.state.language);
                if (found_index === -1) {
                    this.state.language = DEFAULT_SETTINGS.language;
                    this.state.languageIndex = DEFAULT_SETTINGS.languageIndex;
                } else {
                    this.state.languageIndex = found_index;
                }
            } catch (error) {
                console.error("Failed to parse cookie data, using defaults:", error);
                this.state = { ...DEFAULT_SETTINGS };
            }
        } else {
            this.state = { ...DEFAULT_SETTINGS };
        }
    }
    //#endregion
}

export const App_State = new C_State_Manager();

//#endregion
