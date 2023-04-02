/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */

import ConditionalWrapper from '../../components/ConditionalWrapper';

/**
 * WP dependencies
 */

import { useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		apiImage,
		coverAltText,
		uploadedImage,
		isbn,
		bookTitle,
		author,
		workId,
		url,
		linkTarget,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'block__book-cover flex justify-center',
	} );

	const isEmptyImage = isEmpty( uploadedImage );

	/**
	 * Handle additional logic
	 */

	const apiImageAltText = ( coverAltText === undefined ) || ( coverAltText === '' ) ? ( `${ bookTitle } by ${ author } ` ).trim() : coverAltText;

	const imageClasses = ! isEmptyImage ? 'shadow-book-img uploaded-image' : 'shadow-book-img api-image';
	const imageSrc = ! isEmptyImage ? uploadedImage?.sizes?.full.url : apiImage;
	const imageAltText = ! isEmptyImage ? uploadedImage.alt : apiImageAltText;

	/**
	 * Handle element styles
	 */

	/**
	 * Handle element classes
	 */

	return (
		imageSrc && (
			<div { ...blockProps }>
				<div className='book-cover--inner'>
					<div class="image-wrapper relative">
						<ConditionalWrapper
							condition={ url }
							wrapper={ ( img ) => <a href={ url } target={ linkTarget ? '_blank' : null } rel={ linkTarget ? 'noopener' : null }>{ img }</a> }
						>
							<img
								className={ imageClasses }
								src={ imageSrc }
								alt={ imageAltText }
								title={ bookTitle ? bookTitle : null }
								data-isbn={ isbn ? isbn : null }
								data-workId={ workId ? workId : null }
								loading='lazy'
							/>
						</ConditionalWrapper>
					</div>
				</div>
			</div>
		)
	);
};

export default save;
