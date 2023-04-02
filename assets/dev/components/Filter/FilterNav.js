import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * BrowseBy
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const FilterNav = ( { categoryData, imprintData } ) => {
	const [ maxCategories, setMaxCategories ] = useState( [] );
	const [ maxImprints, setMaxImprints ] = useState( [] );

	useEffect( () => {
		const maxCategories = categoryData.filter( ( item, index ) => index <= 4 ? item : null );
		const maxImprints = imprintData.filter( ( item, index ) => index <= 4 ? item : null );

		const sortAlphabetically = ( data ) => {

			return data.sort( ( a, b ) => {
				if ( a.title?.rendered < b.title?.rendered ) {
					return -1;
				}
				
				if ( a.title?.rendered > b.title?.rendered ) {
					return 1;
				}
				
				return 0;
			} );
		};

		setMaxCategories( sortAlphabetically( maxCategories ) );
		setMaxImprints( sortAlphabetically( maxImprints ) );

	}, [ categoryData, imprintData ] )

	return (
		<>
			<h4 className='pb-24'>Category</h4>
			<ul className='filters__nav w-full list-none p-0 mb-20 h-[197px] overflow-y-scroll'>
				{ categoryData.map( ( category ) => (
					<li className='' key={ self.crypto.randomUUID() }>
						<a className='no-underline hover:underline' href={ category.link }>
							<span  dangerouslySetInnerHTML={ { __html: category.title.rendered } } />
						</a>
					</li>
				) ) }
			</ul>
			<h4 className='pb-24'>Imprint</h4>			
			<ul className='filters__nav w-full list-none p-0 h-[197px] overflow-y-scroll'>
				{ imprintData?.map( ( imprint ) => (
					<li className='' key={ self.crypto.randomUUID() }>
						<a className='no-underline hover:underline' href={ imprint.link }>
							<span  dangerouslySetInnerHTML={ { __html: imprint.title.rendered } } />
						</a>
					</li>
				) ) }
			</ul>			
		</>
	);
};

export default FilterNav;
