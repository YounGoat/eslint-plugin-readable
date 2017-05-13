'use strict';

module.exports = {
	extend() {
		let ret = {};
		Array.from(arguments).forEach((arg) => {
			if (typeof arg != 'object') return;
			for (let name in arg) {
				if (arg.hasOwnProperty(name)) {
					ret[name] = arg[name];
				}
			}
		});
		return ret;
	},

	isCamelCase: require('./isCamelCase'),
	isPascalCase: require('./isPascalCase')
}
