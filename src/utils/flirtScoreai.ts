import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";



const model = new ChatOpenAI({
  openAIApiKey:import.meta.env.VITE_OPENAI_API_KEY,
  temperature: 0.7,
});

export const analyzeFlirtingSkill = async (message) => {
  const scorePrompt = `Rate the flirting skill of this message on a scale of 1 to 10. Respond with only the number: "${message}"`;
  const replyPrompt = `Reply to this flirting message with a flirty response: "${message}"`;

  try {
    const [scoreResponse, replyResponse] = await Promise.all([
      model.call([new HumanMessage(scorePrompt)]),
      model.call([new HumanMessage(replyPrompt)]),
    ]);

    const score = parseInt(scoreResponse.content.toString(), 10);
    const reply = replyResponse.content.toString();

    return {
      score: isNaN(score) ? 5 : score,
      reply: reply || "Hmm... interesting! Tell me more 😉",
    };
  } catch (error) {
    console.error("Error analyzing flirting skill:", error);
    return {
      score: 5,
      reply: "I’m lost in your words! Try again? 😍",
    };
  }
};
