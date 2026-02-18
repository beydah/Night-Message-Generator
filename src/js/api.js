import { SERVICE_ENDPOINT } from "./config.js";
import { appState } from "./state.js";
import { TRANSLATIONS } from "./i18n.js";
import { updateUI, showStatusMessage, setGeneratingState } from "./ui.js";

// Helper to get sincerity labels from i18n
function getSincerityLabels(language) {
    return TRANSLATIONS[language].sincerityLevels;
}

// Helper to get misspelling labels from i18n
function getMisspellingLabels(language) {
    return TRANSLATIONS[language].misspellingLevels;
}

function getPromptDetails() {
    const currentAppState = appState.get();
    const {
        length,
        sincerity,
        misspelling,
        emoji,
        punctuation,
        language,
        lowercase,
    } = currentAppState;

    // 1. Length (5-50 words, maps 1-10)
    const wordCount = 5 * length;

    // 2. Sincerity (Formal to Warm, maps 1-10)
    const sincerityMap = getSincerityLabels(language);

    // 3. Misspelling (Correct to Very Incorrect, maps 1-10)
    const misspellingMap = getMisspellingLabels(language);

    // 4. Emoji (0-10)
    const emojiCount = emoji;

    // 5. Punctuation (0-10)
    const punctuationIntensity = punctuation;

    // Map language code to full name for the prompt
    const languageName = {
        tr: "Turkish",
        az: "Azerbaijani",
        en: "English",
        de: "German",
        ru: "Russian",
    }[language];

    const systemInstruction = `You are a creative text generator specializing in "night messages."
            Your response must be a single JSON array containing exactly 5 messages.
            The JSON must only contain the array of strings, like this: ["message 1", "message 2", "message 3", "message 4", "message 5"].`;

    let userQuery = `Generate 5 distinct "night messages" or "good night messages" for a loved one. 
            Each message must be around ${wordCount} words long.
            Use a tone that is described as: ${sincerityMap[sincerity]}.
            The text should exhibit intentional misspellings and slang usage at a level that is described as: ${misspellingMap[misspelling]
        }.
            Include approximately ${emojiCount} emojis per message. **Crucially, distribute these emojis throughout the text (in the beginning, middle, and end), not just clumped at the end.**
            Use punctuation at an intensity level of ${punctuationIntensity}/10 (0 being minimal/none, 10 being heavy and expressive with lots of !!! and ...).
            The messages must be written in ${languageName}.
            ${lowercase
            ? "The entire output text must be strictly in all lowercase letters."
            : "Do not enforce lowercase. Use standard casing."
        }
        `;

    return { systemInstruction, userQuery };
}

export async function generateMessages() {
    if (appState.isLoading) return;

    setGeneratingState(true);
    appState.setLoading(true);

    const { systemInstruction, userQuery } = getPromptDetails();

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
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
                const errorBody = await response.json();
                throw new Error(
                    `Service Error: ${response.status} - ${errorBody.error?.message || response.statusText
                    }`
                );
            }
            break; // Success
        }

        if (!response || !response.ok) {
            throw new Error("Failed to get a successful response after all retries.");
        }

        const result = await response.json();
        const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
            const parsedMessages = JSON.parse(jsonText);
            if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
                appState.set({
                    messages: parsedMessages.slice(0, 5),
                    currentIndex: 0
                });
                updateUI();
                showStatusMessage("5 new messages generated successfully!", "success");
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
        appState.set({ messages: [] });
        updateUI();
        showStatusMessage(
            "Generation failed. Please try again. See console for details.",
            "error"
        );
    } finally {
        setGeneratingState(false);
        appState.setLoading(false);
        // Ensure icons are refreshed if the DOM changed
        if (window.lucide) window.lucide.createIcons();
    }
}
