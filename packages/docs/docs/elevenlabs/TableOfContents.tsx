import React from 'react';
import {Grid} from '../../components/TableOfContents/Grid';
import {TOCItem} from '../../components/TableOfContents/TOCItem';

export const TableOfContents: React.FC = () => {
	return (
		<div>
			<Grid>
				<TOCItem link="/docs/elevenlabs/elevenlabs-api-to-captions">
					<strong>{'elevenLabsApiToCaptions()'}</strong>
					<div>
						Turn ElevenLabs API transcriptions into an array of{' '}
						<code>Caption</code>
					</div>
				</TOCItem>
			</Grid>
		</div>
	);
};
