var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, os = require('os')
	, path = require('path')
	/* NPM */

	/* in-package */
	;

var words = null;
if (os.platform() === 'darwin' || os.platform() === 'linux') {
	var pathOfWords = '/usr/share/dict/words';
	if (fs.existsSync(pathOfWords)) {
		words = fs.readFileSync(pathOfWords, 'utf8').split(os.EOL);
	}
}

var terms = fs.readFileSync(path.join(__dirname, 'terms'), 'utf8').split('\n');

module.exports = function spelling(text, n) {
	if (!words) return true;
	if (typeof n === 'undefined') n = 3;

	if (text instanceof Array) {
		for (var i = 0; i < text.length; i++) {
			if (!spelling(text[i])) return false;
		}
		return true;
	}
	else if (typeof text == 'string' || text instanceof String) {
		var t = text.replace(/\d+$/, '');
		if (t.length <= n) return true;

		t = t.toLowerCase();
		return words.indexOf(t) >= 0 || terms.indexOf(t) >= 0;
	}
	else {
		throw new Error('String | [String] expected but: ' + text);
	}
};
