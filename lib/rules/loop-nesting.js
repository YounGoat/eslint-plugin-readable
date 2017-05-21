/**
 * Restrict the depth of loop nesting.
 * @author youngoat@163.com
 */
'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	, util2 = require('../util')
	;

const LOOP_NODE_TYPES =
	[ 'DoWhileStatement'
	, 'ForStatement'
	, 'WhileStatement'
	];

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

	function getDepth(statement) {
		let d = 0;
		let node = statement;
		do {
			if (LOOP_NODE_TYPES.indexOf(node.type) >= 0) {
				d++;
			}
		} while (node = node.parent)
		return d;
	}

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		ForStatement(node) {
			let depth = getDepth(node);
			if (depth > options.max) {
				context.report({
					node,
					message: `loop nesting is too deep`
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
