import "../css/style.css";
import { appState } from "./state.js";
import { updateUI, initUIListeners, scrollToCard } from "./ui.js";

window.onload = () => {
    // Load settings
    appState.load();

    // Initialize Listeners
    initUIListeners();

    // Initial UI Render
    updateUI();

    // Scroll to saved position
    const st = appState.get();
    if (st.messages.length > 0) {
        scrollToCard(st.currentIndex, false);
    }
};
