'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, fs = require('fs')
	, path = require('path')
	/* NPM */
	, RuleTester = require('eslint').RuleTester
	/* in-package */
	, exampleParser = require('../../lib/example-parser')
	;

// Where demos located.
const EXAMPLE_ROOT = path.resolve(__dirname, '..', '..', 'examples', 'rules');

let filenames;
if (process.argv[3]) {
	let filename = `${process.argv[3]}.js`;
	if (!fs.existsSync(path.join(EXAMPLE_ROOT, filename))) {
		console.error(`Rule example ${filename} not found.`);
		process.exit(1);
	}
	filenames = [ filename ];
}
else {
	filenames = fs.readdirSync(EXAMPLE_ROOT);
}

// Traverse all demos.
filenames.forEach((filename) => {

	// Get the name of corresponding rule.
	let ruleName = filename.slice(0, -3);

	// Require the homonymous rule.
	let rule = require(`../../lib/rules/${ruleName}`);

	// Parse the demo file.
	let demo = { valid: [], invalid: [] };
	exampleParser(path.join(EXAMPLE_ROOT, filename)).forEach((info) => {
		if (info.errors) {
			demo.invalid.push(info);
		}
		else {
			demo.valid.push(info);
		}
	});

	// Create a tester.
	var ruleTester = new RuleTester({
		parserOptions: { ecmaVersion: 2015 }
	});

	// Run the tester.
	ruleTester.run(`RULE ${ruleName}`, rule, demo);
});
