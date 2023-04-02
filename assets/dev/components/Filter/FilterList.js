import React, { useEffect, useState } from 'react';

import FilterCategory from './FilterCategory';
import FilterFeatured from './FilterFeatured';
import FilterImprint from './FilterImprint';

/**
 * BrowseBy
 *
 * A DWT reusable component
 *
 * @param {Object} props
 * @param {string} props.featureBy
 */
const FilterList = ( { context, categoryPost, categoryData, imprintPost, imprintData, setStart } ) => {

	return (
		<>
			<h4 className='filters__list-heading py-20 border-b solid border-b-lightgray'>Filter By:</h4>
			<ul className='filters__list list-none p-0'>
				{ imprintPost && (
						<FilterCategory 
							context={ context }
							setStart={ setStart }
							categoryPost={ categoryPost }
							categoryData={ categoryData }
						/>
				) }

				{ categoryPost && (
					<FilterImprint context={ context } setStart={ setStart } imprintPost={ imprintPost } imprintData={ imprintData } />
				) }

				<FilterFeatured context={ context } setStart={ setStart } />

			</ul>
		</>
	);
};

export default FilterList;
