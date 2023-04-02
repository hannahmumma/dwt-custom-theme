/**
 * External dependencies
 */

import isEmpty from 'lodash/isEmpty';

/**
 * DWT dependencies
 */

import { filterOutWhiteSpace } from '../utils/general-utils';
import ConditionalWrapper from '../../components/ConditionalWrapper';

/**
 * WP dependencies
 */

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		image,
		mobileImage,
		blurEffect,
		borderColor,
		borderStyle,
		baseStyle,
		url,
		linkTarget,
		coverImagesOption,
		backgroundColor,
		bookCoverBlockImages,
		hasImageWithTextParentBlock,
	} = attributes;

	/**
	 * General settings
	 */

	const isEmptyImage = isEmpty( image );
	const isEmptyMobileImage = isEmpty( mobileImage );

	/**
	 * Block
	 */

	// We need to set the color property of this block to the value of the border color.
	// This is so we can set the border color as currentcolor for the base styles.
	// Setting at top block level due to aspect ratios on inner div and image
	const borderColorForBaseStyles = hasImageWithTextParentBlock.length === 0 && borderColor ? { color: borderColor } : undefined;

	const blockProps = useBlockProps.save( {
		className: 'block__featured-image',
		style: { ...borderColorForBaseStyles },
	} );

	/**
	 * Innerblocks
	 */

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save(
		{ className: `inner-blocks-wrapper ${ coverImagesOption && ! isEmptyImage ? 'absolute' : '' }` },
	);

	/**
	 * Handle additional logic
	 */

	const hasBlur = ! isEmptyImage && blurEffect ? 'image-has-blur' : '';
	const isCurved = baseStyle === 'has-curve';
	const curvedBaseWithBorder = ( isCurved && borderColor ) ? 'has-curved-border' : '';

	const hasCovers = coverImagesOption && bookCoverBlockImages.length > 0 ? 'has-covers' : '';
	const hasOneCover = coverImagesOption && bookCoverBlockImages.length === 1 ? 'has-one-cover' : '';
	const hasTwoCovers = coverImagesOption && bookCoverBlockImages.length === 2 ? 'has-two-covers' : '';
	const hasThreeCovers = coverImagesOption && bookCoverBlockImages.length === 3 ? 'has-three-covers' : '';

	/**
	 * Handle styles
	 */

	const bgColor = backgroundColor && coverImagesOption ? { backgroundColor } : undefined;

	/**
	 * Handle element classes
	 */

	const featuredImageInnerClasses = filterOutWhiteSpace( [
		'featured-image--inner',
		baseStyle,
		curvedBaseWithBorder,
		borderStyle,
		hasBlur,
		hasCovers,
		hasOneCover,
		hasTwoCovers,
		hasThreeCovers,
	] );

	return (
		<div { ...blockProps }>

			<div
				className={ featuredImageInnerClasses }
				style={ { ...bgColor } }>

				{ ! isEmptyImage && (

					<div className="image-wrapper w-full h-full">
						<ConditionalWrapper
							condition={ url }
							wrapper={ ( img ) => <a href={ url } target={ linkTarget ? '_blank' : null } rel={ linkTarget ? 'noopener noreferrer' : null }>{ img }</a> }
						>
							<picture>
								{ mobileImage.sizes?.full?.url && (
									<source srcset={ mobileImage.sizes.full?.url } media="(max-width: 375px)" />
								) }

								{ image.sizes?.full.url && (
									<source srcset={ image.sizes.full?.url } media="(max-width: 1024px)" />
								) }

								<img className='featured-image__image object-cover w-full h-full object-center' src={ image?.sizes?.full?.url } alt={ image?.alt } loading='lazy' />
							</picture>

						</ConditionalWrapper>
					</div>
				) }

				{ coverImagesOption && (
					<div { ...innerBlocksProps }>
						{ children }
					</div>
				) }
			</div>
		</div>
	);
};

export default save;
