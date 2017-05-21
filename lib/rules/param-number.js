/**
 * Restrict the length of parameters.
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
	const customOption = context.options[0];

	let options = {
		max: 4
	};

	if (typeof customOption === 'number') {
		options.max = customOption;
	}
	else if (typeof customOption === 'object') {
		options = util2.extend(options, customOption);
	}

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		FunctionDeclaration(node) {
			if (node.params.length > options.max) {
				context.report({
					node,
					message: `too many function parameters`
				});
			}
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'require var names to be camelCase',
			category: 'Readable',
			recommended: true
		},
		fixable: null,  // or 'code' or 'whitespace'
		schema: [
			{
				oneOf: [
					{
						type: 'integer',
						minimum: 1
					},
					{
						type: 'object',
						properties: {
							max: {
								type: 'integer',
								minimum: 1
							}
						},
						additionalProperties: false
					}
				]
			}
		]
	},

	create
};
