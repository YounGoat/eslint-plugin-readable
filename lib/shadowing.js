/**
 * To judge if something is in the shadow of somthing else.
 * @author youngoat@163.com
 */

var isEqualable = function(v) {
	switch (typeof v) {
		case 'number':
			return !Number.isNaN(v);

		case 'undefined':
		case 'string':
		case 'boolean':
		case 'symbol':
			return true;

		case 'object':
			return v === null;

		default:
			return false;
	}
};

var Shadow = function(matcher) {
	this.belongto = matcher;
};


var shadowing = function REDO(origin, shadow) {
	if (isEqualable(shadow)) {
		return origin === shadow;
	}

	else if (shadow instanceof Shadow) {
		return shadow.belongto(origin);
	}

	// If the origin is an array, its shadow should also be an array.
	else if (origin instanceof Array && shadow instanceof Array) {
		// Traverse the shadow array.
		// If anyone is not found in the projection of origin, then return false.
		for (var i = 0; i < shadow.length; i++) {

			// The equalable item should be among the origin items.
			if (isEqualable(shadow[i])) {
				if (origin.indexOf(shadow[i]) >= 0) continue;
				return false;
			}

			// If the item is not equalable, it should be in the shadow of someone item in the origin.
			else {
				var found = false;
				for (var j = 0; j < origin.length && !found; j++) {
					found = REDO(origin[j], shadow[i]);
				}
				if (found) continue;
				return false;
			}
		}

		return true;
	}

	else if (origin === null) {
		return false;
	}

	else if (typeof origin == 'object' && typeof shadow == 'object') {
		for (var key in shadow) {

			if (shadow[key] == shadowing.EXIST) {
				if (origin.hasOwnProperty(key)) continue;
				return false;
			}

			if (REDO(origin[key], shadow[key])) continue;
			return false;
		}

		return true;
	}

	else {
		return false;
	}
};

shadowing.EXIST = Symbol('defined');

shadowing.Shadow = Shadow;

shadowing.OR = function() {
	var args = Array.from(arguments);
	return new Shadow((value) => {
		var matched = false;
		for (var i = 0; i < args.length && !matched; i++) {
			matched = shadowing(value, args[i]);
		}
		return matched;
	});
};

shadowing.AND = function() {
	var args = Array.from(arguments);
	return new Shadow((value) => {
		var matched = true;
		for (var i = 0; i < args.length && !matched; i++) {
			matched = shadowing(value, args[i]);
		}
		return matched;
	});
};

module.exports = shadowing;
