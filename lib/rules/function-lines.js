/**
 * Restrict the length of a function.
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
		max: 40,
		skipComments: true,
		skipBlankLines: true
	};

	if (typeof customOption === 'number') {
		options.max = customOption;
	}
	else if (typeof customOption === 'object') {
		options = util2.extend(options, customOption);
	}

	const sourceCode = context.getSourceCode();

	//----------------------------------------------------------------------
	// Helpers
	//----------------------------------------------------------------------

	function rangeToArray(start, end) {
		let arr = [], i = start;
		while (i <= end) {
			arr.push(i++);
		}
		return arr;
	}

	/**
	 * Returns whether or not a token is a comment node type
	 * @param {Token} token The token to check
	 * @returns {boolean} True if the token is a comment node
	 *
	 * This function is copied from eslint/lib/rules/max-lines.js
	 */
	function isCommentNodeType(token) {
		return token && (token.type === 'Block' || token.type === 'Line');
	}

	/**
	 * This function is copied from eslint/lib/ast-utils.js
	 */
	function isTokenOnSameLine(left, right) {
		return left.loc.end.line === right.loc.start.line;
	}

	/**
	 * Returns the line numbers of a comment that don't have any code on the same line
	 * @param {Node} comment The comment node to check
	 * @returns {int[]} The line numbers
	 *
	 * This function is mainly copied from eslint/lib/rules/max-lines.js
	 */
	function getLinesWithoutCode(comment) {
		let start = comment.loc.start.line;
		let end = comment.loc.end.line;

		let token;

		token = comment;
		do {
			token = sourceCode.getTokenBefore(token, { includeComments: true });
		} while (isCommentNodeType(token));

		if (token && isTokenOnSameLine(token, comment)) {
			start += 1;
		}

		token = comment;
		do {
			token = sourceCode.getTokenAfter(token, { includeComments: true });
		} while (isCommentNodeType(token));

		if (token && isTokenOnSameLine(comment, token)) {
			end -= 1;
		}

		return (start <= end) ? rangeToArray(start, end) : [];
	}

	//----------------------------------------------------------------------
	// Public
	//----------------------------------------------------------------------

	return {
		FunctionDeclaration(node) {
			const start = node.loc.start.line;
			const end = node.loc.end.line;

			let lines = rangeToArray(start, end);

			if (options.skipBlankLines) {
				lines = lines.filter(l => {
					// ATTENTION: The line number is 1-based.
					return sourceCode.lines[l - 1].trim() !== '';
				});
			}

			if (options.skipComments) {
				context.getAllComments().forEach(function(comment) {
					let line = comment.loc.start.line;
					/**
					 * If the comment node is located into the function.
					 *
					 * If starting at the line where the function begins, a comment MAY be a one-line block comment
 					 * which is leading the function, e.g.
					 *   /<asterisk> inline block comment <asterisk>/ function sayHello() { // ...
					 * Don't worry, such situation has been taken into consideration.
					 *
					 * Meanwhile, a comment starting at the line where the function ends MAY be inner one-line block comment
					 * of the function. Such comment need not to be skipped when counting the lines of the function.
					 */
					if (start <= line && line < end) {
						let pureCommentLines = getLinesWithoutCode(comment);
						lines = lines.filter(l => pureCommentLines.indexOf(l) < 0);
					}
				});
			}

			if (lines.length > options.max) {
				let optionNames = [ `${options.max}` ];
				if (options.skipComments) optionNames.push('ignore-comments');
				if (options.skipBlankLines) optionNames.push('ignore-blanklines');

				context.report({
					node,
					message: `function exceeds max lines (${optionNames.join(', ')})`
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
							},
							skipComments: {
								type: 'boolean'
							},
							skipBlankLines: {
								type: 'boolean'
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
