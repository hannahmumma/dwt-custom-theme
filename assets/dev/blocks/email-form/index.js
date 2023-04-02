import './editor.css';
import './style.css';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { defaultEnvelopeIcon } from '../../img/icons';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( metadata, {
	icon: defaultEnvelopeIcon,
	edit: Edit,
	save,
} );
