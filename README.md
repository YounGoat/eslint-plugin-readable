#	eslint-plugin-readable
__Make your JavaScript more readable.__

##	Rules

*	__readable/const-name__  
	Require const name to be UPPER_CASE.

	Available options:
	*	_Array_ <except>

*	__readable/function-lines__  
	Require number of lines in a function to be no more than `max`.

	Available options:
	*	_number_ <max> DEFAULT `40`
	*	_object_ { max: _number_ DEFAULT `40`, skipBlankLines: _boolean_ DEFAULT `true`, skipComments: _boolean_ DEFAULT `true` }

*	__readable/function-name__  
	Require function name to be camelCase.

	Available options:
	*	_Array_ <except>

*	__readable/loop-counter__  
	Require counter variable used in for-statement to be single lowercase character.

*	__readable/loop-nesting__  
	Require depth of loop nesting to be LE a fixed number.

	Available options:
	*	_number_ <max> DEFAULT `4`
	*	_object_ { max: _number_ DEFAULT `4` }

*	__readable/param-number__  
	Require number of function params to be LE a fixed number.

	Available options:
	*	_number_ <max> DEFAULT `4`
	*	_object_ { max: _number_ DEFAULT `4` }

*	__readable/property-name__  
	Require property name to be camelCase.

	Available options:
	*	_Array_ <except>

*	__readable/space-in-brackets__    
	Require matching spaces inside brackets couple.

*	__readable/space-in-parens__  
	Require matching spaces inside parenthese couple.

*	__readable/var-name__  
	Require property name to be camelCase.

	Available options:
	*	_Array_ <except>
