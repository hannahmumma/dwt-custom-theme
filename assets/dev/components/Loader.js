import React from 'react';

/**
 * Loader
 *
 * Component for loading state
 *
 * @param {Object}  props
 * @param {boolean} props.showMetadata
 *
 */
const Loader = ( { showMetadata } ) => {
	return (
		<div className="is-loading w-full h-full flex flex-col">
			<div className="loading-image mb-16 aspect-[270/331] bg-light-gray"></div>

			{ showMetadata && (
				<div className="loading-metadata">
					<div className="loading-title mb-[0.1rem] bg-light-gray h-[24px] w-[100%]"></div>
					<div className="loading-author mb-[0.1rem] bg-light-gray h-[24px] w-[80%]"></div>
					<div className="loading-format bg-light-gray h-[24px] w-[40%]"></div>
				</div>
			) }

		</div>
	);
};

export default Loader;

