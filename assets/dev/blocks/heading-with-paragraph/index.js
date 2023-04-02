import './editor.css';
import './style.css';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { starEnvelopeIcon } from '../../img/icons';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( metadata, {
	icon: starEnvelopeIcon,
	edit: Edit,
	save,
} );
