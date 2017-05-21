/**
 * Restrict the whitespaces inside brackets.
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

	const sourceCode = context.getSourceCode();

	//----------------------------------------------------------------------
	// Helpers
	//----------------------------------------------------------------------

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		Program: function(node) {
			const tokens = sourceCode.tokensAndComments;
			let expectingSpaces = [];

			for (let i = 0; i < tokens.length; i++) {
			 	let token = tokens[i];

				if (token.type !== 'Punctuator') {
					// DO NOTHING.
				}
				else if (token.value === '[') {
					// Start position in the sourceCode text of whitespace text after the opening parenthese.
					let begin = token.range[1];

					// End position (not contained) in the sourceCode text of whitespace text after the opening parenthese.
					let end = tokens[i+1].range[0];

					// Get whitespace after the opening parenthese and save it.
					let whitespace = sourceCode.text.slice(begin, end);

					if (whitespace != '' && whitespace != ' ') {
						context.report({
							node,
							loc: token.loc.start,
							message: 'unexpected whitespace inside this brcket'
						});
						break;
					}
					expectingSpaces.push(whitespace);
				}
				else if (token.value === ']') {
					// Start position in the sourceCode text of whitespace text before the closing parenthese.
					let begin = tokens[i-1].range[1];

					// End position (not contained) in the sourceCode text of whitespace text before the closing parenthese.
					let end = token.range[0];

					let whitespace = sourceCode.text.slice(begin, end);
					if (whitespace != expectingSpaces.pop()) {
						context.report({
							node,
							loc: token.loc.start,
							message: 'unexpected whitespace inside this brcket'
						});
						break;
					}
				}
			}
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'require matching spaces inside brackets couple',
			category: 'Readable',
			recommended: true
		},
		fixable: null,
		schema: []
	},
	create
};
