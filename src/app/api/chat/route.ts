import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = await streamText({
		model: openai("gpt-4-turbo"),
		system:
			"Your are only to respond to an animal told by the user, nothing else is allowed." +
			"Based on the animal the user tells you, you are to respons with 3 least known fun facts about the animal." +
			"Avoid using markdowns, emojis, or any other special characters.",
		messages: convertToCoreMessages(messages),
	});

	return result.toDataStreamResponse();
}
