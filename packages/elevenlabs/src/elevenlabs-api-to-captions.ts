import type {Caption} from '@remotion/captions';
import type {ElevenLabsAlignment} from './elevenlabs-alignment';

export type ElevenLabsToCaptionsInput = {
	alignment: ElevenLabsAlignment;
};

export type ElevenLabsToCaptionsOutput = {
	captions: Caption[];
};

export const elevenLabsApiToCaptions = ({
	alignment,
}: ElevenLabsToCaptionsInput): ElevenLabsToCaptionsOutput => {
	const captions: Caption[] = [];

	if (
		!alignment ||
		!alignment.characters ||
		!alignment.character_start_times_seconds ||
		!alignment.character_end_times_seconds
	) {
		throw new Error('Invalid ElevenLabs alignment formatting');
	}

	const {
		characters,
		character_start_times_seconds,
		character_end_times_seconds,
	} = alignment;

	let currentWord = '';
	let startMs = -1;
	let endMs = -1;

	for (let i = 0; i < characters.length; i++) {
		const char = characters[i];
		const charStartMs = character_start_times_seconds[i] * 1000;
		const charEndMs = character_end_times_seconds[i] * 1000;

		if (startMs === -1) {
			startMs = charStartMs;
		}

		const isSpace = /\s/.test(char);
		const hasNonSpace = currentWord.trim().length > 0;

		if (isSpace && hasNonSpace) {
			captions.push({
				confidence: null,
				startMs,
				endMs,
				text: currentWord,
				timestampMs: (startMs + endMs) / 2,
			});
			currentWord = char;
			startMs = charStartMs;
			endMs = charEndMs;
		} else {
			currentWord += char;
			endMs = charEndMs;
		}
	}

	if (currentWord.trim().length > 0) {
		captions.push({
			confidence: null,
			startMs,
			endMs,
			text: currentWord,
			timestampMs: (startMs + endMs) / 2,
		});
	}

	// Edge case: if the first word starts with a space, we trim it as per OpenAI Whisper implementation
	if (captions.length > 0 && captions[0].text.startsWith(' ')) {
		captions[0].text = captions[0].text.trimStart();
	}

	return {captions};
};
