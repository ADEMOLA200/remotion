import {test} from 'vitest';
import {renderStillOnWeb} from '../render-still-on-web';
import '../symbol-dispose';
import {issue7050Repro} from './fixtures/text/issue-7050-repro';
import {testImage} from './utils';

test('should render gradient text with parent and child filters (issue 7050)', async () => {
	const blob = await (
		await renderStillOnWeb({
			licenseKey: 'free-license',
			composition: issue7050Repro,
			frame: 0,
			inputProps: {},
		})
	).blob({format: 'png'});

	await testImage({
		blob,
		testId: 'issue-7050-repro',
		threshold: 0,
		allowedMismatchedPixelRatio: 0.03,
	});
});
