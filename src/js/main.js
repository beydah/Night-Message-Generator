import "../css/style.css";
import { appState } from "./state.js";
import { updateUI, initUIListeners, scrollToCard } from "./ui.js";
import { generateMessages } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    // console.log("Main loaded");
    // Load settings
    appState.load();

    // Initialize Listeners with callback
    initUIListeners(generateMessages);

    // Initial UI Render
    updateUI();

    // Scroll to saved position
    const st = appState.get();
    if (st.messages.length > 0) {
        scrollToCard(st.currentIndex, false);
    }
});
