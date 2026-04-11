import React from 'react';
import {AbsoluteFill} from 'remotion';

const Component: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#222',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				id="word-wrapper"
				style={{
					display: 'flex',
					flexDirection: 'column',
					filter:
						'drop-shadow(rgb(160, 216, 62) 0px 0px 100px) drop-shadow(rgba(0, 0, 0, 0.35) 5px 5px 15px)',
				}}
			>
				<div
					style={{
						textAlign: 'center',
						whiteSpace: 'nowrap',
						width: '100%',
						position: 'relative',
						overflow: 'visible',
					}}
				>
					<div
						data-line-id="1"
						data-line-active="true"
						style={{
							display: 'block',
							position: 'relative',
							fontFamily: 'Inter',
							fontSize: 32,
							lineHeight: 0.9,
							color: 'rgb(255, 255, 255)',
							textAlign: 'center',
							textShadow: 'rgba(0, 0, 0, 0.35) 5px 5px 15px',
							height: 'unset',
							opacity: 1,
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
								data-word-id="4"
								style={{
									fontFamily: 'Inter',
									fontSize: 210,
									color: 'rgb(160, 216, 62)',
									display: 'inline-block',
									textAlign: 'center',
									textShadow: 'none',
									backgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									fontWeight: 900,
									lineHeight: 0.9,
									filter: 'drop-shadow(rgba(0, 0, 0, 0.35) 5px 5px 15px)',
									textTransform: 'uppercase',
									opacity: 1,
									backgroundImage:
										'linear-gradient(90deg, rgb(160, 216, 62) 0%, rgb(160, 216, 62) 20%, rgb(170, 220, 83) 40%, rgb(202, 233, 147) 50%, rgb(170, 220, 83) 70%, rgb(160, 216, 62) 80%, rgb(160, 216, 62) 100%)',
									whiteSpace: 'pre',
								}}
							>
								hotel
							</span>
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

export const issue7050Repro = {
	component: Component,
	id: 'issue-7050-repro',
	width: 800,
	height: 400,
	fps: 25,
	durationInFrames: 1,
} as const;
