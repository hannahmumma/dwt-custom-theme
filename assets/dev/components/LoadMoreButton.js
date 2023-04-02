import React from 'react';

import { arrowRightIcon } from '.././img/icons';

/**
 * Button
 *
 * Button component for automatic lists
 * Uses button attributes from data-button-styles, which are set in the editor
 *
 * @param {Object}  props
 * @param {Object}  props.buttonWrapper
 * @param {Object}  props.loadMore
 * @param {boolean} props.loading
 */
const LoadMoreButton = ( { loadMore, loading } ) => {
	return (
		<div className={`wp-block-dwt-button block__button` }>
			<div className='button-wrapper'>
				<button className='btn-primary bg-black text-white' onClick={ loadMore }>
					{ loading ? 'Loading...' : 'Load More' }
				</button>
			</div>
		</div>
	);
};

export default LoadMoreButton;
