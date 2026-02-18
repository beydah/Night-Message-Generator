//#region Constants
export const APP_ID =
    typeof __app_id !== "undefined" ? __app_id : "default-message-generator-app";

// --- Configuration ---
export const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
export const SERVICE_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

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
//#endregion
