import {AbsoluteFill} from 'remotion';

// Repro: layered gradient text + drop-shadow; third copy uses mask-image.
// Web renderer misaligns / changes metrics vs browser preview (see issue).
const LABEL = 'hotel';

const sharedTextStyle: React.CSSProperties = {
	fontFamily: 'sans-serif',
	fontSize: 100,
	color: 'rgb(160, 216, 62)',
	display: 'inline-block',
	textAlign: 'center',
	textShadow: 'none',
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	fontWeight: 900,
	lineHeight: 0.9,
	textTransform: 'uppercase',
	opacity: 1,
	backgroundImage:
		'linear-gradient(90deg, rgb(160, 216, 62) 0%, rgb(160, 216, 62) 20%, rgb(170, 220, 83) 40%, rgb(202, 233, 147) 50%, rgb(170, 220, 83) 70%, rgb(160, 216, 62) 80%, rgb(160, 216, 62) 100%)',
	whiteSpace: 'pre',
};

const Component: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1a1a1a',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<span
				style={{
					position: 'relative',
					display: 'inline-block',
					whiteSpace: 'pre',
				}}
			>
				<span
					aria-hidden
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						width: '150%',
						height: '100%',
						transform: 'translate(-50%, -50%)',
						filter: 'blur(15px)',
						pointerEvents: 'none',
						zIndex: 0,
					}}
				/>

				<span style={{position: 'relative', display: 'inline-block'}}>
					<span
						style={{
							...sharedTextStyle,
							filter: 'drop-shadow(rgba(0, 0, 0, 0.35) 5px 5px 15px)',
						}}
					>
						{LABEL}
					</span>

					<span
						aria-hidden
						style={{
							...sharedTextStyle,
							filter:
								'drop-shadow(rgba(255, 255, 255, 0.84) -2px -2px 3px) drop-shadow(rgba(255, 255, 255, 0.58) -1px -1px 0px)',
							position: 'absolute',
							inset: 0,
							maskImage:
								'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 15%, black 30%, black 70%, rgba(0, 0, 0, 0.15) 85%, transparent 100%)',
						}}
					>
						{LABEL}
					</span>
				</span>
			</span>
		</AbsoluteFill>
	);
};

export const maskedGradientTextOverlay = {
	component: Component,
	id: 'masked-gradient-text-overlay',
	width: 960,
	height: 400,
	fps: 25,
	durationInFrames: 1,
} as const;
