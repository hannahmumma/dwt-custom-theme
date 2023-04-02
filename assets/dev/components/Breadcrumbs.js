import React, { useContext, useEffect, useRef, useState } from 'react';


// import { capitalizeFirstLetter } from '.././utils/general-utils';
import ConditionalWrapper from './ConditionalWrapper';

/**
 * BlockInfo
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const Breadcrumbs = ( { context, slug } ) => {
	const landing = slug === 'books';

	return (
		<ul className='list-with-filters__breadcrumbs flex list-none gap-10 p-0'>			
			<ConditionalWrapper
				condition={ slug !== 'books' }
				wrapper={ () => <li>{ <a href={ `/${ context.featureBy.toLowerCase() }` }>{ context.featureBy }</a> }</li> }
			>
				<li>{ slug }</li>
			</ConditionalWrapper>

			{ slug !== 'books' && (
				<>
					<span>&rsaquo;</span>
					<li>{ slug }</li>					
				</>
			) }
		</ul>
	);
};

export default Breadcrumbs;
