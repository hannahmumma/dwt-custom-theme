const fse = require("fs-extra");
const manage = require("./manage");
const copy = require("./copy");

/**
 * watchAssets
 * 
 * Watches static asset folders and moves them from dev to dist
 * @param {string} value
 * @param {string} destination
 * 
 */
const watchAssets = (value, destination) => {
    fse.watch(value, { recursive: true }, (evt, name, err) => {
    	if (err) {
    		console.log(err)
    	} else {
        	copy.copyAssets(value, destination);    		
    	}
    });
};

manage.manageAssets(watchAssets);
