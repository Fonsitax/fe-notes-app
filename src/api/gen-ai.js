import config from "../../config.js";

const PATH = "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/";
const PATH_COMPLETIONS = "chat/completions";
const API_TOKEN = config.apiToken;
const API_MODE = config.mode;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
    'provider': 'open-ai',
    'mode': API_MODE
}


export const postCompletion = async (message) => {
    const body = JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: message,
        max_tokens: 200,
    });

    console.log('request body: ', body)

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