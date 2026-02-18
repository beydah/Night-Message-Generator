import { SERVICE_ENDPOINT } from "../config/app_config.js";
import { App_State } from "../state/store.js";
import { TRANSLATIONS } from "../i18n/i18n.js";
import { F_Update_UI, F_Show_Status_Message, F_Set_Generating_State } from "../ui/ui_manager.js";

//#region Internal Helpers

// Helper to get sincerity labels from i18n
//#region F_Get_Sincerity_Labels
function F_Get_Sincerity_Labels(p_language) {
    return TRANSLATIONS[p_language].sincerityLevels;
}
//#endregion

// Helper to get misspelling labels from i18n
//#region F_Get_Misspelling_Labels
function F_Get_Misspelling_Labels(p_language) {
    return TRANSLATIONS[p_language].misspellingLevels;
}
//#endregion

//#region F_Get_Prompt_Details
function F_Get_Prompt_Details() {
    const current_app_state = App_State.F_Get();
    const {
        length,
        sincerity,
        misspelling,
        emoji,
        punctuation,
        language,
        lowercase,
    } = current_app_state;

    // 1. Length (5-50 words, maps 1-10)
    const word_count = 5 * length;

    // 2. Sincerity (Formal to Warm, maps 1-10)
    const sincerity_map = F_Get_Sincerity_Labels(language);

    // 3. Misspelling (Correct to Very Incorrect, maps 1-10)
    const misspelling_map = F_Get_Misspelling_Labels(language);

    // 4. Emoji (0-10)
    const emoji_count = emoji;

    // 5. Punctuation (0-10)
    const punctuation_intensity = punctuation;

    // Map language code to full name for the prompt
    const language_name = {
        tr: "Turkish",
        az: "Azerbaijani",
        en: "English",
        de: "German",
        ru: "Russian",
    }[language];

    const system_instruction = `You are a creative text generator specializing in "night messages."
            Your response must be a single JSON array containing exactly 5 messages.
            The JSON must only contain the array of strings, like this: ["message 1", "message 2", "message 3", "message 4", "message 5"].`;

    let user_query = `Generate 5 distinct "night messages" or "good night messages" for a loved one. 
            Each message must be around ${word_count} words long.
            Use a tone that is described as: ${sincerity_map[sincerity]}.
            The text should exhibit intentional misspellings and slang usage at a level that is described as: ${misspelling_map[misspelling]
        }.
            Include approximately ${emoji_count} emojis per message. **Crucially, distribute these emojis throughout the text (in the beginning, middle, and end), not just clumped at the end.**
            Use punctuation at an intensity level of ${punctuation_intensity}/10 (0 being minimal/none, 10 being heavy and expressive with lots of !!! and ...).
            The messages must be written in ${language_name}.
            ${lowercase
            ? "The entire output text must be strictly in all lowercase letters."
            : "Do not enforce lowercase. Use standard casing."
        }
        `;

    return { system_instruction, user_query };
}
//#endregion

//#endregion

//#region F_Generate_Messages
export async function F_Generate_Messages() {
    if (App_State.is_loading) return;

    F_Set_Generating_State(true);
    App_State.F_Set_Loading(true);

    const { system_instruction, user_query } = F_Get_Prompt_Details();

    const payload = {
        contents: [{ parts: [{ text: user_query }] }],
        systemInstruction: { parts: [{ text: system_instruction }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "ARRAY",
                items: { type: "STRING" },
            },
        },
    };

    const MAX_RETRIES = 3;
    let response;

    try {
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            response = await fetch(SERVICE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.status === 429 && attempt < MAX_RETRIES - 1) {
                console.warn(
                    `Rate limit encountered, retrying in ${Math.pow(2, attempt)}s...`
                );
                const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue; // Retry
            }
            if (!response.ok) {
                const error_body = await response.json();
                throw new Error(
                    `Service Error: ${response.status} - ${error_body.error?.message || response.statusText
                    }`
                );
            }
            break; // Success
        }

        if (!response || !response.ok) {
            throw new Error("Failed to get a successful response after all retries.");
        }

        const result = await response.json();
        const json_text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (json_text) {
            const parsed_messages = JSON.parse(json_text);
            if (Array.isArray(parsed_messages) && parsed_messages.length > 0) {
                App_State.F_Set({
                    messages: parsed_messages.slice(0, 5),
                    currentIndex: 0
                });
                F_Update_UI();
                F_Show_Status_Message("5 new messages generated successfully!", "success");
            } else {
                throw new Error(
                    "Invalid response format received from service: JSON array is empty or not an array."
                );
            }
        } else {
            throw new Error(
                "Service response was empty or malformed (No text content)."
            );
        }
    } catch (error) {
        console.error("External service call failed:", error);
        App_State.F_Set({ messages: [] });
        F_Update_UI();
        F_Show_Status_Message(
            "Generation failed. Please try again. See console for details.",
            "error"
        );
    } finally {
        F_Set_Generating_State(false);
        App_State.F_Set_Loading(false);
        // Ensure icons are refreshed if the DOM changed
        if (window.lucide) window.lucide.createIcons();
    }
}
//#endregion
