/**
 * Demo for rule readable/loop-nesting
 */

// @good
['male', 'female'] /* no whitespace inside parens */

// @good
[ 'male', 'female' ] /* matching space inside parens */

// @bad
[	'male', 'female'	] /* tabs inside parens */

// @bad
[  'male', 'female'  ] /* more than one spaces inside parens */

// @bad
[ 'male', 'female'] /* unmatching space inside parens */
