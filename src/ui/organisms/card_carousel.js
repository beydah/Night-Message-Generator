import { App_State } from "../../state/store.js";
import { TRANSLATIONS } from "../../i18n/i18n.js";
import { F_Show_Status_Message } from "../molecules/status_message.js";

//#region Organism: Card Carousel

const get_card_carousel = () => document.getElementById("card-carousel");
const get_current_card_index_el = () => document.getElementById("current-card-index");
const get_total_cards_el = () => document.getElementById("total-cards");
const get_nav_prev_button = () => document.getElementById("nav-prev");
const get_nav_next_button = () => document.getElementById("nav-next");
const get_message_placeholder = () => document.getElementById("message-placeholder");

//#region F_Get_Translations
function F_Get_Translations() {
    return TRANSLATIONS[App_State.F_Get().language];
}
//#endregion

//#region F_Scroll_To_Card
export function F_Scroll_To_Card(p_index, p_animate = true) {
    const card_carousel = get_card_carousel();
    const card = document.getElementById(`msg-card-${p_index}`);
    if (card) {
        card_carousel.scrollTo({
            left: card.offsetLeft - card_carousel.scrollLeft + card_carousel.scrollLeft,
            behavior: p_animate ? "smooth" : "auto",
        });
        App_State.F_Set({ currentIndex: p_index });
        App_State.F_Save();

        const current_card_index_el = get_current_card_index_el();
        if (current_card_index_el) current_card_index_el.textContent = p_index + 1;
    }
}
//#endregion

//#region F_Copy_Message
export function F_Copy_Message(p_index) {
    const text = App_State.F_Get().messages[p_index];
    if (!text) {
        F_Show_Status_Message("Error: Message not found.", "error");
        return;
    }

    try {
        const temp_textarea = document.createElement("textarea");
        temp_textarea.value = text;
        temp_textarea.style.position = "fixed";
        temp_textarea.style.left = "-9999px";
        document.body.appendChild(temp_textarea);
        temp_textarea.select();
        document.execCommand("copy");
        document.body.removeChild(temp_textarea);

        F_Show_Status_Message("Message copied to clipboard!", "success");
    } catch (err) {
        console.error("Copy failed:", err);
        F_Show_Status_Message("Failed to copy message.", "error");
    }
}
//#endregion

//#region F_Navigate_Carousel
export function F_Navigate_Carousel(p_direction) {
    const st = App_State.F_Get();
    if (st.messages.length === 0) return;

    let new_index = st.currentIndex + p_direction;

    if (new_index >= st.messages.length) {
        new_index = 0;
    } else if (new_index < 0) {
        new_index = st.messages.length - 1;
    }

    F_Scroll_To_Card(new_index, true);
}
//#endregion

//#region F_Render_Messages
export function F_Render_Messages() {
    const st = App_State.F_Get();
    const messages = st.messages;
    const card_carousel = get_card_carousel();
    const message_placeholder = get_message_placeholder();
    const current_card_index_el = get_current_card_index_el();
    const total_cards_el = get_total_cards_el();
    const nav_prev_button = get_nav_prev_button();
    const nav_next_button = get_nav_next_button();

    card_carousel.innerHTML = "";
    total_cards_el.textContent = messages.length;

    if (messages.length === 0) {
        message_placeholder.classList.remove("hidden");
        card_carousel.classList.add("hidden");
        current_card_index_el.textContent = 0;
    } else {
        message_placeholder.classList.add("hidden");
        card_carousel.classList.remove("hidden");
        current_card_index_el.textContent = st.currentIndex + 1;
    }

    const show_nav = messages.length > 1;
    nav_prev_button.style.opacity = show_nav ? "1" : "0";
    nav_next_button.style.opacity = show_nav ? "1" : "0";
    nav_prev_button.disabled = !show_nav;
    nav_next_button.disabled = !show_nav;

    if (messages.length === 0) return;

    messages.forEach((text, index) => {
        const card_wrapper = document.createElement("div");
        card_wrapper.className = "card-wrapper";
        card_wrapper.id = `msg-card-${index}`;
        const t = F_Get_Translations();

        card_wrapper.innerHTML = `
                <div class="bg-card-bg h-96 p-6 rounded-2xl shadow-xl flex flex-col transition-colors duration-300 border border-gray-100 dark:border-gray-800">
                    <div class="flex-grow overflow-y-auto text-lg leading-relaxed text-primary-text mb-4 p-2 custom-scrollbar message-text-content">
                        <!-- Content injected below safely -->
                    </div>
                    <button class="copy-btn w-full py-2 bg-gray-100 dark:bg-gray-700 text-secondary-text rounded-xl hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                        data-index="${index}"
                        style="background-color: var(--primary-color); border: 1px solid var(--primary-color); color: var(--primary-color);">
                        <i data-lucide="copy" class="w-5 h-5"></i>
                        ${t.copyMessage}
                    </button>
                </div>
            `;
        // Safer injection
        const text_div = card_wrapper.querySelector(".message-text-content");
        text_div.innerHTML = text.replace(/\n/g, "<br>");

        // Attach event listener for copy
        const copy_btn = card_wrapper.querySelector(".copy-btn");
        copy_btn.addEventListener("click", () => F_Copy_Message(index));

        card_carousel.appendChild(card_wrapper);
    });

    F_Scroll_To_Card(st.currentIndex, false);
}
//#endregion

//#endregion
