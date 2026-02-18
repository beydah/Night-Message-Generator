//#region Netlify Function: Generate

const API_KEY = process.env.GEMINI_API_KEY;
const SERVICE_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

//#region F_Handler
exports.handler = async function (p_event, p_context) {
    // Only allow POST
    if (p_event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
        };
    }

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: { message: "Server configuration error: API Key missing." } }),
        };
    }

    try {
        const response = await fetch(SERVICE_ENDPOINT, {
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
        console.error("Proxy Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: { message: "Internal Server Error during proxy request." } }),
        };
    }
};
//#endregion

//#endregion
