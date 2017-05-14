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
	const customOption = context.options[0];

	let options = {
		except: []
	};

	options = util2.extend(options, customOption);
	if (typeof options.except === 'string') {
		options.except = [ options.except ];
	}

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		CallExpression(node) {
			if (node.callee.type != 'Identifier') return;

			const name = node.callee.name;
			if (options.except.indexOf(name) < 0 && !util2.isCamelCase(name)) {
				context.report({ node, message: 'general function name should be camelCase' });
			}
		},

		FunctionDeclaration(node) {
			// @todo Necessary to check type?
			if (node.id.type != 'Identifier') return;

			const name = node.id.name;
			if (options.except.indexOf(name) < 0 && !util2.isCamelCase(name) && !util2.isPascalCase(name)) {
				context.report({ node, message: 'function name should be camelCase (general) or Pascale (class)' });
			}
		},

		NewExpression(node) {
			if (node.callee.type != 'Identifier') return;

			const name = node.callee.name;
			if (options.except.indexOf(name) < 0 && !util2.isPascalCase(node.callee.name)) {
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
		schema: [{
			type: 'object',
			properties: {
				except: {
					oneOf: [
						{ type: 'array' },
						{ type: 'string' }
					]
				}
			},
			additionalProperties: false
		}]
	},

	create
};
