/**
 * Demo for rule readable/function-lines.
 */

/**
 * @good
 * @options = { max: 15, skipComments: true }
 * @desc = 'multi-lined function'
 */
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
}

/**
 * @bad
 * @options = { max: 3 }
 * @desc = 'multi-lined function'
 */
function foo() {
	realcode();
	realcode();
}
