import config from "../../config.js";

const PATH = "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/";
const PATH_COMPLETIONS = "chat/completions";
const headers = {
    'Content-Type': 'application/json',
    'Authorization': config.apiToken,
    'provider': 'open-ai',
    'mode': config.mode
}


export const postCompletion = async (messages) => {
    const body = JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 200,
    });

    const response = await fetch(`${PATH}${PATH_COMPLETIONS}`,
        {
            method: 'POST',
            headers: headers,
            body: body,
        });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Request failed with status ${response.status}: ${errorText}`)
    }
    return await response.json();
}