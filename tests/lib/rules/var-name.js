'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require('../../../lib/rules/var-name')
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run('RULE var-name', rule, {
	valid: [
		'var userName',
		'var userName2'
	],

	invalid: [
		{
			code: 'var user_name',
			errors: [ {} ]
		},
		{
			code: 'var Username',
			errors: [ {} ]
		},
		{
			code: 'var userNAME',
			errors: [ {} ]
		},
		{
			code: 'var USERNAME',
			errors: [ {} ]
		}
	]
});
