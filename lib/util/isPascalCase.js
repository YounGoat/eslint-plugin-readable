/**
 * To judge whether name is camelCase.
 * @author youngoat@163.com
 */
module.exports = function(name) {
	return /^([A-Z][a-z0-9]+)+$/.test(name);
}
