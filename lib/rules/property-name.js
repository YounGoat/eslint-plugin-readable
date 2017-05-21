/**
 * Restrict the spelling of property names.
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

	let verify = (node, name) => {
		if (ignore(name)) return;

		if (!util2.isCamelCase(name)) {
			context.report({ node, message: 'property name should be camelCase' });
		}

		if (options.checkSpelling) {
			let words = name.split(/(?=[A-Z])/);
			if (!spelling(words)) {
				context.report({ node, message: 'unexpected spelling of property name' });
			}
		}
	}

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		LabeledStatement(node) {
			if (node.label.type != 'Identifier') return;
			verify(node, node.label.name);
		},

		MemberExpression(node) {
			if (node.property.type != 'Identifier') return;
			verify(node, node.property.name);
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
