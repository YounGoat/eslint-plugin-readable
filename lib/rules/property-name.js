/**
 * Restrict the spelling of property names.
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
		MemberExpression(node) {
			if (node.property.type != 'Identifier') return;

			if (!util2.isCamelCase(node.property.name)) {
				context.report({ node, message: 'property name should be camelCase' });
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
