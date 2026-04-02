import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../components/Button';
import {useKeybinding} from '../../helpers/use-keybinding';
import {ShortcutHint} from './ShortcutHint';

export const CopyStackTrace: React.FC<{
	readonly canHaveKeyboardShortcuts: boolean;
	readonly errorText: string;
}> = ({canHaveKeyboardShortcuts, errorText}) => {
	const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
		'idle',
	);

	const handleCopyToClipboard = useCallback(() => {
		navigator.clipboard
			.writeText(errorText)
			.then(() => {
				setCopyState('copied');
				setTimeout(() => setCopyState('idle'), 2000);
			})
			.catch(() => {
				// Fallback UI state on copy failure
				setCopyState('failed');
				setTimeout(() => setCopyState('idle'), 2000);
			});
	}, [errorText]);

	const {registerKeybinding} = useKeybinding();

	useEffect(() => {
		if (!canHaveKeyboardShortcuts) {
			return;
		}

		const {unregister} = registerKeybinding({
			event: 'keydown',
			key: 'c', // CMD+C / CTRL+C shortcut for copying
			callback: handleCopyToClipboard,
			commandCtrlKey: true,
			preventDefault: true,
			triggerIfInputFieldFocused: false,
			keepRegisteredWhenNotHighestContext: false,
		});

		return () => unregister();
	}, [canHaveKeyboardShortcuts, handleCopyToClipboard, registerKeybinding]);

	const resolveButtonLabel = () => {
		if (copyState === 'copied') return 'Copied!';
		if (copyState === 'failed') return 'Failed!';
		return 'Copy Stack Trace';
	};

	return (
		<Button onClick={handleCopyToClipboard}>
			{resolveButtonLabel()}{' '}
			{copyState === 'idle' && canHaveKeyboardShortcuts ? (
				<ShortcutHint keyToPress="c" cmdOrCtrl />
			) : null}
		</Button>
	);
};
