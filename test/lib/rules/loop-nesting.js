'use strict';

var MODULE_REQUIRE
	/* built-in */

	/* NPM */
	, RuleTester = require('eslint').RuleTester

	/* in-package */
	, rule = require('../../../lib/rules/loop-nesting')
	;

/**
 * See more parserOptions at:
 * https://github.com/eslint/espree#usage
 */
var ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015 }
});

var code = `
// LOOP 1
for (var i = 0; i < 10; i++) {
	// LOOP 2
	for (var j = 0; j < 10; j++) {
		// LOOP 3
		var k = 0;
		while (k++ < 10) {
			// LOOP 4
			var l = 0
			do {
				// LOOP 5
				for (var m = 0; m < 10; m++) {
				}
			} while(++l < 10)
		}
	}
}
`;

ruleTester.run('RULE loop-nesting', rule, {
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
			options: [ { max: 4 } ],
			desc: 'function code',
			errors: [ {} ]
		}
	]
});
