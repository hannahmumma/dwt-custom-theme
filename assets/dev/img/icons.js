import React from 'react';

/**
 * Embed Icons
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/embed/icons.js
 */

const embedYouTubeIcon = {
	foreground: '#ff0000',
	src: (
		<svg viewBox="0 0 24 24">
			<path d="M21.8 8s-.195-1.377-.795-1.984c-.76-.797-1.613-.8-2.004-.847-2.798-.203-6.996-.203-6.996-.203h-.01s-4.197 0-6.996.202c-.39.046-1.242.05-2.003.846C2.395 6.623 2.2 8 2.2 8S2 9.62 2 11.24v1.517c0 1.618.2 3.237.2 3.237s.195 1.378.795 1.985c.76.797 1.76.77 2.205.855 1.6.153 6.8.2 6.8.2s4.203-.005 7-.208c.392-.047 1.244-.05 2.005-.847.6-.607.795-1.985.795-1.985s.2-1.618.2-3.237v-1.517C22 9.62 21.8 8 21.8 8zM9.935 14.595v-5.62l5.403 2.82-5.403 2.8z" />
		</svg>
	),
};

const defaultEnvelopeIcon = (
	<svg id="Envelope_01" data-name="Envelope 01" xmlns="http://www.w3.org/2000/svg" width="75" height="53.444" viewBox="0 0 75 53.444">
		<g id="Icon_-_Envelope_1" data-name="Icon - Envelope 1">
			<g id="Group_3768" data-name="Group 3768" transform="translate(9.353 6.77)">
				<path id="Path_61194" data-name="Path 61194" d="M78.7,67.5H23.744A5.36,5.36,0,0,1,18.4,62.161V56.1a1.336,1.336,0,0,1,2.672,0v6.057a2.625,2.625,0,0,0,2.672,2.672H78.7a2.625,2.625,0,0,0,2.672-2.672V32.944A2.625,2.625,0,0,0,78.7,30.272H23.744a2.625,2.625,0,0,0-2.672,2.672v3.741a1.336,1.336,0,1,1-2.672,0V32.944A5.36,5.36,0,0,1,23.744,27.6H78.7a5.36,5.36,0,0,1,5.344,5.344V62.071A5.38,5.38,0,0,1,78.7,67.5Z" transform="translate(-18.4 -27.6)"/>
			</g>
			<g id="Group_3769" data-name="Group 3769" transform="translate(60.203 7.382)">
				<path id="Path_61195" data-name="Path 61195" d="M76.835,38.72a1.27,1.27,0,0,1-1.069-.534,1.3,1.3,0,0,1,.267-1.871l10.243-7.749a1.336,1.336,0,0,1,1.6,2.138L77.636,38.453A1.243,1.243,0,0,1,76.835,38.72Z" transform="translate(-75.488 -28.288)"/>
			</g>
			<g id="Group_3770" data-name="Group 3770" transform="translate(11.294 7.375)">
				<path id="Path_61196" data-name="Path 61196" d="M50.616,54.04a1.243,1.243,0,0,1-.8-.267L21.043,30.614a1.329,1.329,0,0,1,1.692-2.049L50.7,51.012,64.511,40.5a1.336,1.336,0,1,1,1.6,2.138l-14.7,11.134A1.243,1.243,0,0,1,50.616,54.04Z" transform="translate(-20.58 -28.28)"/>
			</g>
			<g id="Group_3771" data-name="Group 3771" transform="translate(11.265 33.177)">
				<path id="Path_61197" data-name="Path 61197" d="M21.841,69.23a1.276,1.276,0,0,1-.98-.445,1.3,1.3,0,0,1,.178-1.871l11.134-9.353a1.329,1.329,0,0,1,1.692,2.049L22.732,68.874A1.144,1.144,0,0,1,21.841,69.23Z" transform="translate(-20.547 -57.247)"/>
			</g>
			<g id="Group_3772" data-name="Group 3772" transform="translate(26.704 25.457)">
				<path id="Path_61198" data-name="Path 61198" d="M39.234,55.278a1.643,1.643,0,0,1-1.069-.445,1.381,1.381,0,0,1,.178-1.871l4.9-4.1a1.329,1.329,0,0,1,1.692,2.049l-4.9,4.1A1.089,1.089,0,0,1,39.234,55.278Z" transform="translate(-37.88 -48.58)"/>
			</g>
			<g id="Group_3773" data-name="Group 3773" transform="translate(51.529 23.827)">
				<path id="Path_61199" data-name="Path 61199" d="M86.014,68.083a1.34,1.34,0,0,1-.98-.356L66.151,49.021a1.323,1.323,0,0,1,1.871-1.871L86.9,65.856a1.292,1.292,0,0,1,0,1.871A1.361,1.361,0,0,1,86.014,68.083Z" transform="translate(-65.75 -46.75)"/>
			</g>
			<g id="Group_3774" data-name="Group 3774" transform="translate(0 18.884)">
				<path id="Path_61200" data-name="Path 61200" d="M28.743,43.872H9.236a1.336,1.336,0,0,1,0-2.672H28.654a1.37,1.37,0,0,1,1.336,1.336A1.294,1.294,0,0,1,28.743,43.872Z" transform="translate(-7.9 -41.2)"/>
			</g>
			<g id="Group_3775" data-name="Group 3775" transform="translate(11.223 50.772)">
				<path id="Path_61201" data-name="Path 61201" d="M41.343,79.672H21.836a1.336,1.336,0,0,1,0-2.672H41.254a1.37,1.37,0,0,1,1.336,1.336A1.294,1.294,0,0,1,41.343,79.672Z" transform="translate(-20.5 -77)"/>
			</g>
			<g id="Group_3776" data-name="Group 3776" transform="translate(28.771)">
				<path id="Path_61202" data-name="Path 61202" d="M60.954,22.672H41.536a1.336,1.336,0,1,1,0-2.672H60.954a1.336,1.336,0,1,1,0,2.672Z" transform="translate(-40.2 -20)"/>
			</g>
			<g id="Group_3777" data-name="Group 3777" transform="translate(0 24.673)">
				<path id="Path_61203" data-name="Path 61203" d="M25.269,50.372H9.236a1.336,1.336,0,0,1,0-2.672H25.18a1.37,1.37,0,0,1,1.336,1.336A1.294,1.294,0,0,1,25.269,50.372Z" transform="translate(-7.9 -47.7)"/>
			</g>
			<g id="Group_3778" data-name="Group 3778" transform="translate(0 30.463)">
				<path id="Path_61204" data-name="Path 61204" d="M22.241,56.872h-13a1.336,1.336,0,1,1,0-2.672h13a1.336,1.336,0,0,1,0,2.672Z" transform="translate(-7.9 -54.2)"/>
			</g>
		</g>
	</svg>
);

const starEnvelopeIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="74.213" height="73.605" viewBox="0 0 74.213 73.605">
		<g id="Icon_-_Envelope_2" data-name="Icon - Envelope 2" transform="translate(2.106 1.5)">
			<path id="Path_61205" data-name="Path 61205" d="M214.946,151.843l3.652,7.3,7.913,1.065-5.782,5.63,1.369,7.913-7.152-3.8-7,3.8,1.369-7.913-5.782-5.63,7.913-1.065Z" transform="translate(-179.338 -134.952)" fill="none" stroke="#000" strokeWidth="3"/>
			<path id="Path_61206" data-name="Path 61206" d="M102.307,225.072v42.761h-70V225.072" transform="translate(-32.307 -197.833)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
			<path id="Path_61207" data-name="Path 61207" d="M102.307,225.072l-35,27.543-35-27.543" transform="translate(-32.307 -197.833)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
			<path id="Path_61208" data-name="Path 61208" d="M32.308,398.219l27.239-21.3" transform="translate(-32.308 -328.219)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
			<path id="Path_61209" data-name="Path 61209" d="M334.916,376.915l27.239,21.3" transform="translate(-292.155 -328.219)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
			<path id="Path_61210" data-name="Path 61210" d="M464.144,176.612l8.978,7" transform="translate(-403.122 -156.22)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
			<path id="Path_61211" data-name="Path 61211" d="M213.226,39.765l9.435-7.457,9.587,7.608" transform="translate(-187.661 -32.308)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
			<path id="Path_61212" data-name="Path 61212" d="M32.308,184.537l8.978-6.848" transform="translate(-32.308 -157.146)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
			<path id="Path_61213" data-name="Path 61213" d="M96.92,112.478V86.152h51.739v26.326" transform="translate(-87.79 -78.543)" fill="none" stroke="#000" strokeLinecapp="round" stroke-linejoin="round" strokeWidth="3"/>
		</g>
	</svg>
);

const arrowRightIcon = (
	<svg className="arrow-right" xmlns="http://www.w3.org/2000/svg" width="7.755" height="11.995" viewBox="0 0 7.755 11.995">
		<path id="arrow" d="M244.609,4456.377l5.344,4.685-5.344,4.49" transform="translate(-243.198 -4454.966)" fill="none" stroke="currentColor" strokelinecapp="round" strokeLinejoin="round" strokeWidth="2"/>
	</svg>
);

const arrowLeftCarouselIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="19.244" height="27.812" viewBox="0 0 19.244 27.812">
		<path d="M1.7,27.812l17.544-13.6V13.6L1.632,0,0,2.108l15.368,11.9L.068,25.84Z" fill="currentColor" stroke="currentColor" transform="translate(19.244 27.812) rotate(180)"/>
	</svg>
);

const arrowRightCarouselIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="19.244" height="27.812" viewBox="0 0 19.244 27.812">
		<path d="M1.7,0,19.244,13.6v.612L1.632,27.812,0,25.7,15.368,13.8.068,1.972Z" fill="currentColor" stroke="currentColor" />
	</svg>
);

const closeButtonIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="20.421" height="20.421" viewBox="0 0 20.421 20.421">
		<g id="Close_button" data-name="Close button" transform="translate(1.768 1.768)">
			<path id="Stroke_1" data-name="Stroke 1" d="M0,16.886,16.886,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"/>
			<path id="Stroke_3" data-name="Stroke 3" d="M0,0,16.886,16.886" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"/>
		</g>
	</svg>
);

const searchIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="21.999" viewBox="0 0 21.999 21.999">
		<g id="icon-search-white" transform="translate(-450.156 -1184.001)">
			<path id="Fill_1" data-name="Fill 1" d="M20.063,22h0L15.5,17.434a9.515,9.515,0,0,1-5.734,1.937h-.2A9.625,9.625,0,0,1,0,9.686V9.567A9.626,9.626,0,0,1,9.624,0H9.8a9.638,9.638,0,0,1,9.566,9.685A9.507,9.507,0,0,1,17.434,15.5L22,20.063,20.064,22ZM9.549,2.768A6.859,6.859,0,0,0,2.768,9.686v.137A6.852,6.852,0,0,0,9.618,16.6h.205A6.859,6.859,0,0,0,16.6,9.686V9.549a6.851,6.851,0,0,0-6.85-6.782H9.549Z" transform="translate(450.155 1184)" fill="currentColor"/>
		</g>
	</svg>

);

const mobileMenuIcon = (
	<svg className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="37.6" height="27.2" viewBox="0 0 37.6 27.2">
		<g id="Mobile_Hamburger" data-name="Mobile Hamburger" transform="translate(0.749 0.6)">
			<path id="Stroke_1" data-name="Stroke 1" d="M0,.65H35.1" transform="translate(0.501)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.5"/>
			<path id="Stroke_3" data-name="Stroke 3" d="M0,.5H17.1" transform="translate(18.501 12.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.5"/>
			<path id="Stroke_5" data-name="Stroke 5" d="M0,.65H35.1" transform="translate(0.501 24.7)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.5"/>
		</g>
	</svg>
);

export {
	embedYouTubeIcon,
	defaultEnvelopeIcon,
	starEnvelopeIcon,
	arrowRightIcon,
	arrowLeftCarouselIcon,
	arrowRightCarouselIcon,
	closeButtonIcon,
	searchIcon,
	mobileMenuIcon,
};
