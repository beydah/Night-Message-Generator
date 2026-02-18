import "./styles/main.css";
import { App_State } from "./state/store.js";
import { F_Update_UI, F_Init_UI_Listeners, F_Scroll_To_Card } from "./ui/ui_manager.js";
import { F_Generate_Messages } from "./services/gemini_service.js";

document.addEventListener('DOMContentLoaded', () => {
    // console.log("Main loaded");
    // Load settings
    App_State.F_Load();

    // Initialize Listeners with callback
    F_Init_UI_Listeners(F_Generate_Messages);

    // Initial UI Render
    F_Update_UI();

    // Scroll to saved position
    const st = App_State.F_Get();
    if (st.messages.length > 0) {
        F_Scroll_To_Card(st.currentIndex, false);
    }
});
