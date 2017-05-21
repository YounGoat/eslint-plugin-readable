'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require('../../../lib/rules/const-name')
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run('RULE const-name', rule, {
	valid: [
		'const MALE = 1, FEMALE = 0',
		{
			code: 'const male = 1',
			options: [{
				except: 'male'
			}]
		}
	],

	invalid: [
		{
			code: 'const male = 1',
			errors: [ { message: 'const name should be UPPER_CASE' } ]
		},
		{
			code: 'const MALE = 1, Female = 0',
			errors: [ { message: 'const name should be UPPER_CASE' } ]
		}
	]
});
