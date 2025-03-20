import { HfInference } from "@huggingface/inference";

export async function handler(event) {
    try {
        const { ingredients } = JSON.parse(event.body);
        const hf = new HfInference(process.env.HF_API_KEY); // Securely using env variable

        const SYSTEM_PROMPT = `
        You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
        `;

        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredients.join(", ")}. Please give me a recipe you'd recommend i make!` },
            ],
            max_tokens: 1024,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ recipe: response.choices[0].message.content }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
}
