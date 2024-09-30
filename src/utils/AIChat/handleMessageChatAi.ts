import { Configuration, OpenAIApi } from 'openai';
const config = new Configuration({
    apiKey: process.env.CHAT_KEY,
});
const openai = new OpenAIApi(config);

const handleMessage = async (mess: any) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: mess?.chat }],
        });
        if (response.status === 200) {
            const botResponse: string | undefined =
                response.data.choices[0].message?.content;
            if (botResponse) {
                return {
                    success: true,
                    message: botResponse,
                };
            } else {
                return {
                    success: false,
                    message: 'not success',
                };
            }
        } else {
            return {
                success: false,
                message: 'server error',
            };
        }
    } catch (error: any) {
        console.log(error.message);
    }
};

export { handleMessage };
