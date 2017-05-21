/**
 * Demo for rule readable/property-name
 */

// @good
user.userName

// @good
user.address.cityName

// @bad
foo.user_name

// @bad
foo.Username

// @bad
foo.userNAME

// @bad
foo.USERNAME

// @bad
// @options.checkSpelling = true
foo.userNamme /* bad spelling */

// @bad
{ user_name: "example" }
