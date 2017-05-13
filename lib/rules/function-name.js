/**
 * Restrict the spelling of function names.
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
		CallExpression(node) {
			if (node.callee.type != 'Identifier') return;

			if (!util2.isCamelCase(node.callee.name)) {
				context.report({ node, message: 'general function name should be camelCase' });
			}
		},

		FunctionDeclaration(node) {
			// @todo Necessary to check type?
			if (node.id.type != 'Identifier') return;

			if (!util2.isCamelCase(node.id.name) && !util2.isPascalCase(node.id.name)) {
				context.report({ node, message: 'function name should be camelCase (general) or Pascale (class)' });
			}
		},

		NewExpression(node) {
			if (node.callee.type != 'Identifier') return;

			if (!util2.isPascalCase(node.callee.name)) {
				context.report({ node, message: 'class name should be PascalCase' });
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
