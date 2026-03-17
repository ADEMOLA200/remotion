import type {AnyRemotionOption} from './option';

const cliFlag = 'browser-download-dir' as const;

let currentDirectory: string | null = null;

export const browserDownloadDirOption = {
	name: 'Browser Download Directory',
	cliFlag,
	description: () => (
		<>
			Specify the directory where the browser should be downloaded to when
			calling <code>npx remotion browser ensure</code>. By default, Remotion
			downloads the browser into <code>node_modules/.remotion</code> inside the
			nearest project root. Use this option to override the default download
			location. Pass <code>null</code> to use the default location.
		</>
	),
	ssrName: 'browserDownloadDir' as const,
	docLink: 'https://www.remotion.dev/docs/config#setbrowserdownloaddir',
	type: '' as string | null,
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			return {
				source: 'cli',
				value: commandLine[cliFlag] as string | null,
			};
		}

		if (currentDirectory !== null) {
			return {
				source: 'config',
				value: currentDirectory,
			};
		}

		return {
			source: 'default',
			value: null,
		};
	},
	setConfig: (value: string | null) => {
		currentDirectory = value;
	},
	id: cliFlag,
} satisfies AnyRemotionOption<string | null>;
