import { App_State } from "../../state/store.js";
import { TRANSLATIONS } from "../../i18n/i18n.js";
import { F_Clear_All_Cookies } from "../../utils/helpers.js";

//#region Organism: Side Menu & Settings

const get_side_menu = () => document.getElementById("side-menu");
const get_overlay_menu = () => document.getElementById("overlay-menu");
const get_theme_toggle = () => document.getElementById("theme-toggle");
const get_lang_toggle = () => document.getElementById("lang-toggle");
const get_lowercase_toggle = () => document.getElementById("lowercase-toggle");
const get_lowercase_toggle_bg = () => document.getElementById("lowercase-toggle-bg");

//#region F_Toggle_Menu
export function F_Toggle_Menu() {
    const side_menu = get_side_menu();
    const overlay_menu = get_overlay_menu();
    const is_closed = side_menu.classList.contains("translate-x-full");
    side_menu.classList.toggle("translate-x-full", !is_closed);
    overlay_menu.classList.toggle("hidden", !is_closed);
}
//#endregion

//#region F_Update_Menu
export function F_Update_Menu() {
    const st = App_State.F_Get();
    const t = TRANSLATIONS[st.language];

    const theme_toggle = get_theme_toggle();
    if (theme_toggle) {
        theme_toggle.innerHTML =
            st.theme === "dark"
                ? `<i data-lucide="moon" class="w-4 h-4"></i> ${t.dark}`
                : `<i data-lucide="sun" class="w-4 h-4"></i> ${t.light}`;
    }

    const lang_toggle = get_lang_toggle();
    if (lang_toggle) lang_toggle.textContent = st.language.toUpperCase();

    const lowercase_toggle = get_lowercase_toggle();
    if (lowercase_toggle) lowercase_toggle.checked = st.lowercase;

    // Sync Range Inputs
    const range_inputs = [
        "length",
        "sincerity",
        "misspelling",
        "emoji",
        "punctuation",
    ];

    range_inputs.forEach((key) => {
        const range_el = document.getElementById(`${key}-range`);
        const value_el = document.getElementById(`value-${key}`);
        if (range_el) range_el.value = st[key];

        if (value_el) {
            if (key === "length") {
                const actual_length = 5 * st.length;
                value_el.textContent = actual_length + " " + t.words;
            } else if (key === "sincerity") {
                value_el.textContent = t.sincerityLevels[st.sincerity];
            } else if (key === "misspelling") {
                value_el.textContent = t.misspellingLevels[st.misspelling];
            } else if (key === "emoji" || key === "punctuation") {
                value_el.textContent = st[key];
            }
        }
    });

    // Color Update Logic (Moved here essentially as it affects toggle bg)
    F_Update_Primary_Color();
}
//#endregion

//#region F_Update_Primary_Color
function F_Update_Primary_Color() {
    const min_sincerity = 1;
    const max_sincerity = 10;
    const current_sincerity = App_State.F_Get().sincerity;

    // Amber (A) RGB: 245, 158, 11
    const R_A = 245, G_A = 158, B_A = 11;
    // Rose (R) RGB: 244, 63, 94
    const R_R = 244, G_R = 63, B_R = 94;

    const t = (current_sincerity - min_sincerity) / (max_sincerity - min_sincerity);

    const R = Math.round(R_A + t * (R_R - R_A));
    const G = Math.round(G_A + t * (G_R - G_A));
    const B = Math.round(B_A + t * (B_R - B_A));

    const new_color = `rgb(${R}, ${G}, ${B})`;

    document.documentElement.style.setProperty("--primary-color", new_color);

    const shadow_R = Math.round(R + t * 10);
    const shadow_G = Math.round(G + t * 10);
    const shadow_B = Math.round(B + t * 10);
    const shadow_color = `rgb(${shadow_R}, ${shadow_G}, ${shadow_B})`;
    document.documentElement.style.setProperty("--shadow-color", shadow_color);

    const bg = get_lowercase_toggle_bg();
    if (bg) bg.style.backgroundColor = new_color;
}
//#endregion

//#region F_Init_Menu_Listeners
export function F_Init_Menu_Listeners(p_update_ui_callback) {
    // Menu
    document.getElementById("menu-button")?.addEventListener("click", F_Toggle_Menu);
    document.getElementById("overlay-menu")?.addEventListener("click", F_Toggle_Menu);
    document.querySelector("#side-menu button")?.addEventListener("click", F_Toggle_Menu); // Close btn

    // Settings
    document.getElementById("lang-toggle")?.addEventListener("click", () => {
        const st = App_State.F_Get();
        const codes = ["tr", "az", "en", "de", "ru"];
        const next_index = (st.languageIndex + 1) % codes.length;
        App_State.F_Set({
            languageIndex: next_index,
            language: codes[next_index]
        });
        p_update_ui_callback();
    });

    document.getElementById("lowercase-toggle")?.addEventListener("click", (e) => {
        App_State.F_Set({ lowercase: e.target.checked });
        p_update_ui_callback();
    });

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        const st = App_State.F_Get();
        App_State.F_Set({ theme: st.theme === "light" ? "dark" : "light" });
        p_update_ui_callback();
    });

    // Reset
    const reset_btn = document.querySelector('button[onclick*="clearAllCookies"]');
    if (reset_btn) {
        reset_btn.id = "reset-btn";
        reset_btn.onclick = null;
        reset_btn.addEventListener("click", () => {
            F_Clear_All_Cookies();
            location.reload();
        });
    }

    // Range Inputs
    const range_inputs = [
        "length",
        "sincerity",
        "misspelling",
        "emoji",
        "punctuation",
    ];
    range_inputs.forEach(key => {
        document.getElementById(`${key}-range`)?.addEventListener("input", (e) => {
            App_State.F_Set({ [key]: parseInt(e.target.value) });
            p_update_ui_callback();
        });
    });

    // Settings Toggle (Collapsible)
    const settings_toggle = document.getElementById("settings-toggle");
    const settings_content = document.getElementById("settings-content");
    if (settings_toggle && settings_content) {
        settings_toggle.addEventListener("click", () => {
            const is_expanded = settings_content.classList.contains("h-auto");
            const icon = settings_toggle.querySelector('[data-lucide="chevron-down"]');

            if (is_expanded) {
                settings_content.style.maxHeight = "0";
                settings_content.classList.remove("h-auto", "mt-4");
                icon.classList.remove("rotate-180");
            } else {
                settings_content.style.maxHeight = settings_content.scrollHeight + "px";
                settings_content.classList.add("h-auto", "mt-4");
                icon.classList.add("rotate-180");
            }
        });
    }
}
//#endregion

//#endregion
