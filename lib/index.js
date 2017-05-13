/**
 * @fileoverview just a demo
 * @author jiangjing
 */
'use strict';

var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')
	/* NPM */

	/* in-package */
	;

var rules = {};
fs.readdirSync(path.join(__dirname, 'rules')).forEach((name) => {
	if (path.extname(name) == '.js') {
		var basename = name.substring(0, name.length - 3);
		rules[basename] = require('./rules/' + basename);
	}
});

module.exports = {
	rules: rules,

	configs: {
		recommended: require('../configs/recommended')
	},

	processors: {

	}
};
