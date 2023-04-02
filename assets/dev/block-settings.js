/**
 * Global functions for the block editor
 * Custom block settings are in their respective folders
 *
 * @see inc/block-functions.php for how we're enqueueing this script file + deps
 */

import { init as registrationInit } from './blocks/block-settings/registration';
import { init as filtersInit } from './blocks/block-settings/filters';
import { init as validationsInit } from './blocks/block-settings/validations';

filtersInit();
validationsInit();

wp.domReady( () => {
    registrationInit();    
} );



