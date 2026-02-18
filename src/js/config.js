export const APP_ID =
    typeof __app_id !== "undefined" ? __app_id : "default-message-generator-app";

// Obfuscated service configuration
const _0x7f3a = "QUl6YVN5RGFQbzMzMlhqNU5BanAtNDl3S3l4WS05N3czU25zcmxV";
export const AUTH_CONFIG = (() => {
    try {
        return atob(_0x7f3a);
    } catch (e) {
        return "";
    }
})();

export const COOKIE_NAME = "nightMessageSettings";
export const LANG_CODES = ["tr", "az", "en", "de", "ru"];
export const LANG_DISPLAY = { tr: "TR", az: "AZ", en: "EN", de: "DE", ru: "RU" };

export const DEFAULT_SETTINGS = {
    // Menu Settings
    theme: "dark",
    language: "tr",
    languageIndex: 0,
    lowercase: true,
    // Message Settings
    length: 10, // Range 1-10 (maps to 5-50 words)
    sincerity: 10, // Range 1-10 (maps to Formal to Deeply Sincere)
    misspelling: 5, // Range 1-10 (maps to Correct to Max)
    emoji: 5, // Range 0-10
    punctuation: 0, // Range 0-10
    // Message Content
    messages: [],
    currentIndex: 0,
};
