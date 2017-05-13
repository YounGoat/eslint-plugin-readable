'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require('../../../lib/rules/function-lines')
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

var code = `// outer comment

function foo() {
	realcode(); /* block */
	// line comment
	;

	/**
     * block comment
	 */

	realcode();
	realcode(); // line comment
	/* inline block comment */ realcode(); // line comment
}`;

ruleTester.run('RULE function-lines', rule, {
	valid: [
		// {
		// 	code: code,
		// 	options: [ 15 ],
		// 	desc: 'function code'
		// },
		// {
		// 	code: code,
		// 	filename: 'foo.js',
		// 	options: [ { max: 5, skipComments: true } ],
		// 	desc: 'function code'
		// },
		{
			code: code,
			options: [ { max: 15, skipComments: true } ],
			desc: 'function code'
		}
	],

	invalid: [
		// {
		// 	code: code,
		// 	options: [ 25 - 1 ],
		// 	desc: 'function code',
		// 	errors: [ {} ]
		// },
		// {
		// 	code: code,
		// 	options: [ { max: 15 - 1, skipComments: true } ],
		// 	desc: 'function code',
		// 	errors: [ {} ]
		// },
		// {
		// 	code: code,
		// 	options: [ { max: 22 - 1, skipBlankLines: true } ],
		// 	desc: 'function code',
		// 	errors: [ {} ]
		// }
	]
});
