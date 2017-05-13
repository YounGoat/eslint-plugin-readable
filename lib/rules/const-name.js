/**
 * Restrict the spelling of const names.
 * @author youngoat@163.com
 */
'use strict';

function create(context) {

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		VariableDeclarator(node) {
			if (node.parent.kind == 'const' && node.id.name != node.id.name.toUpperCase()) {
				context.report({ node, message: 'const name should be UPPER_CASE' });
			}
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'require const names to be UPPER_CASE',
			category: 'Name',
			recommended: true
		},
		fixable: null,
		schema: []
	},
	create
};
