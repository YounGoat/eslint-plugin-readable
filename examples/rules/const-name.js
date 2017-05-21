/**
 * Demo for rule readable/const-name.
 */

/* @good */
const MALE = 1, FEMALE = 0

/* @good */
/* @options.except = "male" */
const male = 1

/* @bad */
const male = 1

/* @bad */
const MALE = 1, Female = 0

/* @bad */
/* @options.checkSpelling = true */
const MALEE = 1; /* bad spelling */
