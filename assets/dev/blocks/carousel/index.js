import 'swiper/css';
import './editor.css';
import './style.css';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( metadata, {
	edit: Edit,
	save,
} );

