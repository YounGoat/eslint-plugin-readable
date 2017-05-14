'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require('../../../lib/rules/param-number')
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

var code = `
function f(a, b, c, d, e) {}
`;

ruleTester.run('RULE parameter-number', rule, {
	valid: [
		{
			code: code,
			options: [ { max: 5 } ],
			desc: 'function code'
		}
	],

	invalid: [
		{
			code: code,
			options: [ { max: 3 } ],
			desc: 'function code',
			errors: [ {} ]
		}
	]
});
