import {test} from 'vitest';
import {page} from 'vitest/browser';
import {renderStillOnWeb} from '../render-still-on-web';
import '../symbol-dispose';
import {maskedGradientTextOverlay} from './fixtures/text/masked-gradient-text-overlay';
import {testImage} from './utils';

test('masked gradient text overlay (mask-image + filters)', async () => {
	await page.viewport(960, 400);
	const {blob} = await renderStillOnWeb({
		licenseKey: 'free-license',
		composition: maskedGradientTextOverlay,
		frame: 0,
		inputProps: {},
		imageFormat: 'png',
	});

	await testImage({
		blob,
		testId: 'masked-gradient-text-overlay',
		threshold: 0,
		allowedMismatchedPixelRatio: 0.04,
	});
});
