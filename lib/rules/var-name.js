/**
 * Restrict the spelling of varirable names.
 * @author youngoat@163.com
 */
'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	, util2 = require('../util')
	;

function create(context) {

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		VariableDeclarator(node) {
			if (node.parent.kind != 'var') return;

			if (!util2.isCamelCase(node.id.name)) {
				context.report({ node, message: 'var name should be camelCase' });
			}
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'require var names to be camelCase',
			category: 'Name',
			recommended: true
		},
		fixable: null,  // or 'code' or 'whitespace'
		schema: []
	},

	create
};
