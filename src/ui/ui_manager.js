import { App_State } from "../state/store.js";
import { TRANSLATIONS } from "../i18n/i18n.js";
import { LANG_DISPLAY } from "../config/app_config.js";
import { F_Render_Messages, F_Navigate_Carousel, F_Scroll_To_Card } from "./organisms/card_carousel.js";
import { F_Update_Menu, F_Init_Menu_Listeners } from "./organisms/side_menu.js";
import { F_Show_Status_Message } from "./molecules/status_message.js";

//#region UI Manager (Orchestrator)

const get_generate_button = () => document.getElementById("generate-button");

//#region F_Set_Generating_State
export function F_Set_Generating_State(p_is_generating) {
    const btn = get_generate_button();
    if (p_is_generating) {
        btn.dataset.originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> Generating...`;
    } else {
        const t = TRANSLATIONS[App_State.F_Get().language];
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="sparkles" class="w-5 h-5"></i> ${t.generateButton}`;
    }
}
//#endregion

//#region F_Update_Translations
// Updates static text elements not handled by specific components
function F_Update_Translations() {
    const t = TRANSLATIONS[App_State.F_Get().language];

    document.querySelector("h1").textContent = t.title;

    const settings_header = document.querySelector("#side-menu h2");
    if (settings_header) settings_header.textContent = t.settings;

    const lowercase_label = document.getElementById("lowercase-label");
    if (lowercase_label) lowercase_label.textContent = t.allLowercase;

    const theme_label = document.getElementById("theme-label");
    if (theme_label) theme_label.textContent = t.theme;

    const links_header = document.querySelector("#side-menu h3");
    if (links_header) links_header.textContent = t.links;

    const contribute_link = document.querySelector('a[href*="github"]');
    if (contribute_link)
        contribute_link.innerHTML = `<i data-lucide="github" class="w-4 h-4"></i> ${t.contribute}`;

    const developer_link = document.querySelector('a[href*="beydahsaglam"]');
    if (developer_link)
        developer_link.innerHTML = `<i data-lucide="code" class="w-4 h-4"></i> ${t.developer}`;

    const reset_button = document.querySelector('button[id="reset-btn"]');
    if (reset_button) reset_button.textContent = t.resetSettings;

    const main_settings_header = document.querySelector("#settings-toggle h2");
    if (main_settings_header) main_settings_header.textContent = t.messageSettings;

    const length_label = document.getElementById("label-length");
    if (length_label) length_label.textContent = t.length;

    const sincerity_label = document.getElementById("label-sincerity");
    if (sincerity_label) sincerity_label.textContent = t.sincerity;

    const misspelling_label = document.getElementById("label-misspelling");
    if (misspelling_label) misspelling_label.textContent = t.misspelling;

    const emoji_label = document.getElementById("label-emoji");
    if (emoji_label) emoji_label.textContent = t.emojiUsage;

    const punctuation_label = document.getElementById("label-punctuation");
    if (punctuation_label) punctuation_label.textContent = t.punctuationIntensity;

    const generate_btn = get_generate_button();
    if (generate_btn && !generate_btn.disabled) {
        generate_btn.innerHTML = `<i data-lucide="sparkles" class="w-5 h-5"></i> ${t.generateButton}`;
    }

    const card_header = document.getElementById("card-header");
    if (card_header) {
        const st = App_State.F_Get();
        const current_index = st.currentIndex + 1;
        const total_cards = st.messages.length;
        card_header.innerHTML = `${t.generatedMessages} (<span id="current-card-index">${current_index}</span>/<span id="total-cards">${total_cards}</span>)`;
    }

    const placeholder_text = document.querySelector("#message-placeholder p");
    if (placeholder_text) placeholder_text.textContent = t.placeholderText;

    const footer_text = document.querySelector("footer p");
    if (footer_text) {
        footer_text.innerHTML = `Developed by <a href="https://beydahsaglam.com" target="_blank" class="hover:underline font-medium transition-colors duration-200" style="color: var(--primary-color)">Beydah Saglam</a> for Beyza ❤️`;
    }

    // Range Labels
    const length_range_labels = document.querySelectorAll("#length-range + div span");
    if (length_range_labels.length >= 2) {
        length_range_labels[0].textContent = `5 ${t.words}`;
        length_range_labels[1].textContent = `50 ${t.words}`;
    }

    const sincerity_range_labels = document.querySelectorAll("#sincerity-range + div span");
    if (sincerity_range_labels.length >= 2) {
        sincerity_range_labels[0].textContent = `${t.formal} (1/10)`;
        sincerity_range_labels[1].textContent = `${t.warm} (10/10)`;
    }

    const misspelling_range_labels = document.querySelectorAll("#misspelling-range + div span");
    if (misspelling_range_labels.length >= 2) {
        misspelling_range_labels[0].textContent = `${t.correct} (1/10)`;
        misspelling_range_labels[1].textContent = `${t.maximum} (10/10)`;
    }

    const punctuation_range_labels = document.querySelectorAll("#punctuation-range + div span");
    if (punctuation_range_labels.length >= 2) {
        punctuation_range_labels[0].textContent = `0 (${t.minimal})`;
        punctuation_range_labels[1].textContent = `10 (${t.max})`;
    }
}
//#endregion

//#region F_Update_UI
export function F_Update_UI() {
    const st = App_State.F_Get();
    document.documentElement.classList.toggle("dark", st.theme === "dark");

    F_Update_Menu();
    F_Update_Translations();
    F_Render_Messages();

    App_State.F_Save();

    // Re-create icons
    if (window.lucide) window.lucide.createIcons();
}
//#endregion

//#region F_Init_UI_Listeners
export function F_Init_UI_Listeners(p_on_generate_callback) {
    F_Init_Menu_Listeners(F_Update_UI);

    // Generate
    if (p_on_generate_callback) {
        document.getElementById("generate-button")?.addEventListener("click", p_on_generate_callback);
    }

    // Nav
    document.getElementById("nav-prev")?.addEventListener("click", () => F_Navigate_Carousel(-1));
    document.getElementById("nav-next")?.addEventListener("click", () => F_Navigate_Carousel(1));
}
//#endregion

// Export what was available before, plus strict names
export { F_Show_Status_Message, F_Scroll_To_Card };
//#endregion
