'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require('../../../lib/rules/function-name')
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run('RULE function-name', rule, {
	valid: [
		'function Name() {}',
		'function getName() {}',
		'getName()',
		'getname()'
	],

	invalid: [
		{
			code: 'function get_name() {}',
			errors: [ {} ]
		},
		{
			code: 'function getNAME() {}',
			errors: [ {} ]
		},
		{
			code: 'new getNAME()',
			errors: [ {} ]
		},
		{
			code: 'get_name()',
			errors: [ {} ]
		},
		{
			code: 'GetName()',
			errors: [ {} ]
		},
		{
			code: 'getNAME()',
			errors: [ {} ]
		}
	]
});
