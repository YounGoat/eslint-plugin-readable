/**
 * Demo for rule readable/loop-nesting
 */

// @good
var userName

// @good
userName2

// @bad
var user_name

// @bad
var Username

// @bad
var userNAME

// @bad
var USERNAME

// @bad
// @options.checkSpelling = true
var userNamme /* bad spelling */
