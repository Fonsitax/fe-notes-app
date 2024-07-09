import config from "../../config.js";

const PATH = "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/";
const PATH_COMPLETIONS = "chat/completions";
const API_TOKEN = config.apiToken;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
    'provider': 'open-ai',
    'mode': 'development'
}


export const postCompletion = async () => {
    try {
        const body = JSON.stringify({
            message: 'Was ist die Hauptstadt von Deutschland?',
            // max_tokens: 200,
        });


        const response = await fetch(`${PATH}${PATH_COMPLETIONS}`,
            {
                method: 'POST',
                headers: headers,
                body: body,
            });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }
        return await response.json();

    } catch (error) {
        console.error(error);
    }
}