/**
 * Restrict the spelling of const names.
 * @author youngoat@163.com
 */
'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */

	/* in-package */
	, util2 = require('../util')
	, spelling = require('../spelling')
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
	// Public
	//----------------------------------------------------------------------

	return {
		VariableDeclarator(node) {
			if (node.parent.kind !== 'const') return;

			const name = node.id.name;
			if (options.except.indexOf(name) >= 0) return;

			if (name != name.toUpperCase()) {
				context.report({ node, message: 'const name should be UPPER_CASE' });
			}

			if (options.checkSpelling) {
				let words = name.split('_');
				if (!spelling(words)) {
					context.report({ node, message: 'unexpected spelling of const name' });
				}
			}
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'require const names to be UPPER_CASE',
			category: 'Readable',
			recommended: false
		},
		fixable: null,
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
