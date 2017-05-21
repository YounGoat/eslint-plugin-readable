/**
 * Demo for rule readable/loop-nesting
 */

/**
 * @good
 * @options.max = 3
 */
function f(a, b, c) {}

/**
 * @bad
 * @options.max = 3
 */
function f(a, b, c, d) {}
