'use strict';

const RULE_NAME = require('path').basename(__filename).slice(0, -3);
const RULE_PATH = '../../../lib/rules/' + RULE_NAME;

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require(RULE_PATH)
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run(`RULE ${RULE_NAME}`, rule, {
	valid: [
		"('male', 'female') /* no whitespace inside parens */",
		"( 'male', 'female' ) /* matching space inside parens */",
	],

	invalid: [
		{
			code: "(\t'male', 'female'\t) /* tabs inside parens */",
			errors: [ {} ]
		},
		{
			code: "(  'male', 'female'  ) /* more than one spaces inside parens */",
			errors: [ {} ]
		},
		{
			code: "( 'male', 'female') /* unmatching space inside parens */",
			errors: [ {} ]
		}
	]
});
