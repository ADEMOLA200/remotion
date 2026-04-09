const localhostHostnames = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

export const isLocalhostLikeHostname = (hostname: string): boolean => {
	if (localhostHostnames.has(hostname)) {
		return true;
	}

	return hostname.endsWith('.localhost');
};
