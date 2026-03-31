import {expect, test} from 'bun:test';
import type {ElevenLabsTranscript} from '../elevenlabs-transcript';
import {elevenLabsTranscriptToCaptions} from '../elevenlabs-transcript-to-captions';
import transcript from './gimme-gimme-transcript.json';

test('converts elevenlabs transcript to captions', () => {
	const {captions} = elevenLabsTranscriptToCaptions({
		transcript: transcript as ElevenLabsTranscript,
	});

	// 324 word entries in the transcript
	expect(captions.length).toBe(324);

	// First caption should be "Gimme," (first word entry, no leading space)
	expect(captions[0].text).toBe('Gimme,');
	expect(captions[0].startMs).toBe(84239);
	expect(captions[0].endMs).toBe(84660);

	// Second caption should have leading space
	expect(captions[1].text).toBe(' gimme,');

	// Last caption
	expect(captions[captions.length - 1].text).toBe(' day.');
	expect(captions[captions.length - 1].endMs).toBe(266600);

	// All captions should have confidence null
	for (const caption of captions) {
		expect(caption.confidence).toBeNull();
	}

	// All captions should have valid timestamps
	for (const caption of captions) {
		expect(caption.startMs).toBeLessThanOrEqual(caption.endMs);
		expect(caption.timestampMs).toBeGreaterThanOrEqual(caption.startMs);
		expect(caption.timestampMs).toBeLessThanOrEqual(caption.endMs);
	}
});

test('reconstructed text matches original lyrics', () => {
	const {captions} = elevenLabsTranscriptToCaptions({
		transcript: transcript as ElevenLabsTranscript,
	});

	const reconstructed = captions.map((c) => c.text).join('');
	expect(reconstructed).toContain('Gimme, gimme, gimme a man after midnight');
	expect(reconstructed).toContain('chase the shadows away');
});

test('handles invalid transcript input', () => {
	expect(() =>
		elevenLabsTranscriptToCaptions({
			transcript: {} as unknown as ElevenLabsTranscript,
		}),
	).toThrowError(/Invalid ElevenLabs transcript formatting/);
});

test('handles empty words array', () => {
	const {captions} = elevenLabsTranscriptToCaptions({
		transcript: {
			language_code: 'eng',
			language_probability: 1,
			text: '',
			words: [],
			transcription_id: 'test',
		},
	});

	expect(captions.length).toBe(0);
});
