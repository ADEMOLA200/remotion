import {expect, test} from 'bun:test';
import {isLocalhostLikeHostname} from '../components/RenderModal/is-localhost-like';

test('detects localhost hostnames', () => {
	expect(isLocalhostLikeHostname('localhost')).toBe(true);
	expect(isLocalhostLikeHostname('127.0.0.1')).toBe(true);
	expect(isLocalhostLikeHostname('::1')).toBe(true);
	expect(isLocalhostLikeHostname('[::1]')).toBe(true);
	expect(isLocalhostLikeHostname('app.localhost')).toBe(true);
});

test('does not detect non-localhost hostnames', () => {
	expect(isLocalhostLikeHostname('remotion.dev')).toBe(false);
	expect(isLocalhostLikeHostname('example.com')).toBe(false);
	expect(isLocalhostLikeHostname('localhost.example.com')).toBe(false);
});
