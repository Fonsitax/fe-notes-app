const path = "https://gen-ai-wbs-consumer-api.onrender.com/api/v1/";
const pathCompletions = "chat/completions";


const header = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 6687f8f7d6853d82e4e752ce',
}


export const postCompletion = async () => {
    try {
        const body = JSON.stringify({
            prompt: 'Was ist die Hauptstadt von Deutschland?',
            max_tokens: 200,
        });


        const response = await fetch(`${path}${pathCompletions}`,
            {
                method: 'POST',
                headers: header,
                body: body,
            });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Error in Post', error);
    }
}