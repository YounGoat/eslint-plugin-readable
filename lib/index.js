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

let rules = {};
fs.readdirSync(path.join(__dirname, 'rules')).forEach((name) => {
	let basename = name;
	if (path.extname(name) == '.js') {
		basename = name.slice(0, -3);
	}
	rules[basename] = require('./rules/' + basename);
});

module.exports = {
	rules: rules,

	configs: {
		recommended: require('../configs/recommended')
	},

	processors: {

	}
};
