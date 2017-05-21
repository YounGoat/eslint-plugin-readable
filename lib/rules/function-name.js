/**
 * Restrict the spelling of function names.
 * @author youngoat@163.com
 */
'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	, spelling = require('../spelling')
	, util2 = require('../util')

	, ids = require('../meta/identifiers')
	;

function create(context) {
	const customOption = context.options[0];

	let options = {
		checkSpelling: false,
		except: []
	};

	options = util2.extend(options, customOption);
	if (typeof options.except === 'string') {
		options.except = [ options.except ];
	}

	//----------------------------------------------------------------------
	// Helpers
	//----------------------------------------------------------------------

	let ignore = (name) => {
		if (options.except.indexOf(name) >= 0) return true;
		if (ids.indexOf(name) >= 0) return true;
	};

	let checkSpelling = (node, name) => {
		if (options.checkSpelling) {
			let words = name.split(/(?=[A-Z])/);
			if (!spelling(words)) {
				context.report({ node, message: 'unexpected spelling of function name' });
			}
		}
	};

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		CallExpression(node) {
			if (node.callee.type != 'Identifier') return;

			const name = node.callee.name;
			if (ignore(name)) return;

			if (!util2.isCamelCase(name)) {
				context.report({ node, message: 'general function name should be camelCase' });
			}

			checkSpelling(node, name);
		},

		FunctionDeclaration(node) {
			// @todo Necessary to check type?
			if (node.id.type != 'Identifier') return;

			const name = node.id.name;
			if (ignore(name)) return;

			if (!util2.isCamelCase(name) && !util2.isPascalCase(name)) {
				context.report({ node, message: 'function name should be camelCase (general) or Pascale (class)' });
			}

			checkSpelling(node, name);
		},

		NewExpression(node) {
			if (node.callee.type != 'Identifier') return;

			const name = node.callee.name;
			if (ignore(name)) return;

			if (!util2.isPascalCase(node.callee.name)) {
				context.report({ node, message: 'class name should be PascalCase' });
			}

			checkSpelling(node, name);
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'require var names to be camelCase',
			category: 'Readable',
			recommended: false
		},
		fixable: null,  // or 'code' or 'whitespace'
		schema: [{
			type: 'object',
			properties: {
				checkSpelling: { type: 'boolean' },
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
