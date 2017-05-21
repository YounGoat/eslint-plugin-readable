/**
 * Demo for rule readable/function-name.
 */

// @good
function Name() {}

// @good
function getName() {}

// @good
getName()

// @good
getname()

// @bad
function get_name() {}

// @bad
function getNAME() {}

// @bad
new getNAME()

// @bad
get_name()

// @bad
GetName()

// @bad
getNAME()

// @bad
// @options.checkSpelling = true
function Namme() {} /* bad spelling */
