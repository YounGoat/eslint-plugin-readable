#	eslint-plugin-readable
__Make your JavaScript more readable.__

[![total downloads of eslint-plugin-readable](https://img.shields.io/npm/dt/eslint-plugin-readable.svg)](https://www.npmjs.com/package/eslint-plugin-readable)
[![eslint-plugin-readable's License](https://img.shields.io/npm/l/eslint-plugin-readable.svg)](https://www.npmjs.com/package/eslint-plugin-readable)
[![latest version of eslint-plugin-readable](https://img.shields.io/npm/v/eslint-plugin-readable.svg)](https://www.npmjs.com/package/eslint-plugin-readable)
[![coverage status of github.com/YounGoat/eslint-plugin-readable](https://coveralls.io/repos/github/YounGoat/eslint-plugin-readable/badge.svg?branch=master)](https://coveralls.io/github/YounGoat/eslint-plugin-readable2?branch=master)
[![dependencies of github.com/YounGoat/eslint-plugin-readable](https://david-dm.org/YounGoat/eslint-plugin-readable/status.svg)](https://david-dm.org/YounGoat/eslint-plugin-readable)
[![devDependencies of github.com/YounGoat/eslint-plugin-readable](https://david-dm.org/YounGoat/eslint-plugin-readable/dev-status.svg)](https://david-dm.org/YounGoat/eslint-plugin-readable?type=dev)
[![build status of github.com/YounGoat/eslint-plugin-readable](https://travis-ci.org/YounGoat/eslint-plugin-readable.svg?branch=master)](https://travis-ci.org/YounGoat/eslint-plugin-readable)
[![star github.com/YounGoat/eslint-plugin-readable](https://img.shields.io/github/stars/YounGoat/eslint-plugin-readable.svg?style=social&label=Star)](https://github.com/YounGoat/eslint-plugin-readable/stargazers)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/eslint-plugin-readable)


##	Rules

Notes:  
1.	Option name "-" means the rule's option may be a direct value instead of an object.
2.	Default value "-" means that this option has no default value.

###	readable/const-name
Require const name to be UPPER_CASE.

| Option Type    | Name           | Default Value  | Desc           |
| :------------- | :------------- | :------------- | :------------- |
| *Array*        | __except__     | -              | const names to be ignored |

###	readable/function-lines
Require number of lines in a function to be no more than `max`.

| Option Type    | Name           | Default Value  | Desc           |
| :------------- | :------------- | :------------- | :------------- |
| *number*       | -              | 40             | max lines each function |
| *number*       | max            | 40             | max lines each function |
| *boolean*      | skipBlankLines | true           | whether to skip blank lines |
| *boolean*      | skipComments   | true           | whether to skip comments |

###	readable/function-name
Require function name to be camelCase.

| Option Type    | Name           | Default Value  | Desc           |
| :------------- | :------------- | :------------- | :------------- |
| *Array*        | __except__     | -              | function names to be ignored |

###	readable/loop-counter
Require counter variable used in for-statement to be single lowercase character.

###	readable/loop-nesting
Require depth of loop nesting to be LE a fixed number.

| Option Type    | Name           | Default Value  | Desc           |
| :------------- | :------------- | :------------- | :------------- |
| *number*       | -              | 4              | max depth of loops |
| *number*       | max            | 4              | max depth of loops |

###	readable/param-number
Require number of function params to be LE a fixed number.

| Option Type    | Name           | Default Value  | Desc           |
| :------------- | :------------- | :------------- | :------------- |
| *number*       | -              | 4              | max length of parameters |
| *number*       | max            | 4              | max length of parameters |

###	readable/property-name
Require property name to be camelCase.

| Option Type    | Name           | Default Value  | Desc           |
| :------------- | :------------- | :------------- | :------------- |
| *Array*        | __except__     | -              | property names to be ignored |

###	readable/space-in-brackets  
Require matching spaces inside brackets couple.

###	readable/space-in-parens
Require matching spaces inside parenthese couple.

###	readable/var-name
Require property name to be camelCase.

| Option Type    | Name           | Default Value  | Desc           |
| :------------- | :------------- | :------------- | :------------- |
| *Array*        | __except__     | -              | variable names to be ignored |
