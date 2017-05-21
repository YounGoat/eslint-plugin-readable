/**
 * Restrict the counter used in for-statement.
 * @author youngoat@163.com
 */
'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	, util2 = require('../util')
	, shadowing = require('../shadowing')
	;

function create(context) {

	const sourceCode = context.getSourceCode();

	//----------------------------------------------------------------------
	// Helpers
	//----------------------------------------------------------------------

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		ForStatement: function(node) {
			let shadow = {
				update: {
					type: 'UpdateExpression',
					operator: shadowing.OR('++', '--'),
					argument: { type: 'Identifier' }
				}
			};
			if (shadowing(node, shadow) && !/^[a-z]$/.test(node.update.argument.name)) {
				context.report({
					node,
					message: `counter var used in for-statement is not one lowercase character`
				});
			}
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'restrict the counter used in for-statement',
			category: 'Readable',
			recommended: false
		},
		fixable: null,
		schema: []
	},
	create
};
