/**
 * Restrict the spelling of varirable names.
 * @author youngoat@163.com
 */
'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	, spelling = require('../spelling')
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
		VariableDeclarator(node) {
			if (node.parent.kind != 'var') return;

			let name = node.id.name;
			if (options.except.indexOf(name) >= 0) return;

			name = name.replace(/^_+/, '');

			if (!util2.isCamelCase(name)) {
				context.report({ node, message: 'var name should be camelCase' });
			}

			if (options.checkSpelling) {
				let words = name.split(/(?=[A-Z])/);
				if (!spelling(words)) {
					context.report({ node, message: 'unexpected spelling of var name' });
				}
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
