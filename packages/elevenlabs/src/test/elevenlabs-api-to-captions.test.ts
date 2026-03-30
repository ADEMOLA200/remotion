import {expect, test} from 'vitest';
import type {ElevenLabsAlignment} from '../elevenlabs-alignment';
import {elevenLabsApiToCaptions} from '../elevenlabs-api-to-captions';

test('converts basic elevenlabs output', () => {
	const output = elevenLabsApiToCaptions({
		alignment: {
			characters: [
				'H',
				'e',
				'l',
				'l',
				'o',
				',',
				' ',
				'w',
				'o',
				'r',
				'l',
				'd',
				'!',
			],
			character_start_times_seconds: [
				0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2,
			],
			character_end_times_seconds: [
				0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
			],
		},
	});

	expect(output.captions).toEqual([
		{
			confidence: null,
			startMs: 0,
			endMs: 600,
			text: 'Hello,',
			timestampMs: 300,
		},
		{
			confidence: null,
			startMs: 600,
			endMs: 1300,
			text: ' world!', // Space attached to the next word
			timestampMs: 950,
		},
	]);
});

test('handles pure spaces at the start', () => {
	const output = elevenLabsApiToCaptions({
		alignment: {
			characters: [' ', 'h', 'i'],
			character_start_times_seconds: [0.0, 0.1, 0.2],
			character_end_times_seconds: [0.1, 0.2, 0.3],
		},
	});

	expect(output.captions).toEqual([
		{
			confidence: null,
			startMs: 0,
			endMs: 300,
			text: 'hi', // Text trimmed for the very first word
			timestampMs: 150,
		},
	]);
});

test('handles missing or malformed input gracefully', () => {
	expect(() =>
		elevenLabsApiToCaptions({
			alignment: {} as unknown as ElevenLabsAlignment,
		}),
	).toThrowError(/Invalid ElevenLabs alignment formatting/);
});
