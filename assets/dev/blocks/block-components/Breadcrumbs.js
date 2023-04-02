
import { select } from '@wordpress/data';

import { capitalizeFirstLetter } from '.././utils/general-utils';
import ConditionalWrapper from '../../components/ConditionalWrapper';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const Breadcrumbs = ( { featureBy } ) => {
	const currentPostType = select( 'core/editor' ).getCurrentPostType();
	const landing = featureBy === 'books' ? 'Books' : 'Authors';
	const currentSlug = select('core/editor').getEditedPostSlug() ?? null;

	return (
		<ul className='flex list-none gap-10 p-0'>			
			<ConditionalWrapper
				condition={ currentPostType !== 'page' }
				wrapper={ () => <li>{ <a href={ `/${ landing.toLowerCase() }` }>{ landing }</a> }</li> }
			>
				<li>{ landing }</li>
			</ConditionalWrapper>

			{ currentPostType !== 'page' &&  (
				<>
					<span>&rsaquo;</span>
					<li>{ capitalizeFirstLetter( currentSlug ) }</li>
				</>
			) }
		</ul>
	);
};

export default Breadcrumbs;
