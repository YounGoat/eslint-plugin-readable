'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require('../../../lib/rules/property-name')
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run('RULE property-name', rule, {
	valid: [
		'user.userName',
		'user.address.cityName'
	],

	invalid: [
		{
			code: 'foo.user_name',
			errors: [ {} ]
		},
		{
			code: 'foo.Username',
			errors: [ {} ]
		},
		{
			code: 'foo.userNAME',
			errors: [ {} ]
		},
		{
			code: 'foo.USERNAME',
			errors: [ {} ]
		}
	]
});
