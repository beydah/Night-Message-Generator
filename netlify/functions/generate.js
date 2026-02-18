//#region Netlify Function: Generate

// ESM syntax
// Check both standard naming and VITE_ prefixed naming to be robust against user configuration
const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

//#region F_Handler
export const handler = async (p_event, p_context) => {
    // Only allow POST
    if (p_event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
        };
    }

    // Check for API Key at runtime
    if (!API_KEY) {
        console.error("CRITICAL ERROR: API Key (GEMINI_API_KEY or VITE_GEMINI_API_KEY) is missing from environment variables.");
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: {
                    message: "Server configuration error: GEMINI_API_KEY is missing. Please set it in Netlify Site Settings > Environment Variables and REDEPLOY."
                }
            }),
        };
    }

    const service_endpoint = `${BASE_URL}?key=${API_KEY}`;

    try {
        const response = await fetch(service_endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: p_event.body,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify(data),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Proxy Request Failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: { message: "Internal Server Error during proxy request." } }),
        };
    }
};
//#endregion

//#endregion
