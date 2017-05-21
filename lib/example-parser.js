'use strict';

const MODULE_REQUIRE = 0
	/* built-in */
	, fs = require('fs')
	/* NPM */
	/* in-package */
	;

const SEP = '\n';

/**
 * To parse a paragraph of comments.
 *
 * @param [string] lines - comment text line by line
 * @returns [object] - structured info extracted from the paragraph
 */
const parseCommentParagraph = function(lines) {
	// Cut off begining and ending whitespaces, and leading asterisks.
	let cut = function(line) {
		return line.trim().replace(/^\*+/, '').trimLeft();
	}

	let info = null;

	// Find the first not-empty line (if exists).
	let firstLine, n = 0;
	do {
		firstLine = cut(lines[n++]);
	} while(firstLine === '' && n < lines.length)

	if (['@good', '@bad'].indexOf(firstLine) >= 0) {
		info = { _expect : firstLine.substr(1) };
		lines.slice(1).forEach((line) => {
			if (cut(line).match(/^@(\w+(\.\w+)*)(\s*=\s*(.+))?$/)) {
				let name = RegExp.$1;
				let value = RegExp.$4;

				// If existing, the value text is regarded as stringified JSON.
				if (value) {
					eval(`value = ${value}`);
				}

				// Otherwise, the property is regarded as switching value.
				else {
					value = true;
				}

				// Make the hierarchal structure according the dot-seperating name.
				let node = info;
				let names = name.split('.'), lastName = names.pop();
				names.forEach((name) => {
					if (typeof node[name] === 'object') {
						node = node[name];
					}
					else {
						node = node[name] = {};
					}
				});
				node[lastName] = value;
			}
		});

		if (info.options && !(info.options instanceof Array)) {
			info.options = [ info.options ];
		}
	}
	return info;
};

/**
 * To parse text of a code line which starts with something that belongs a comment block.
 * If the begining of the code line is also the begining of a comment block, the
 * leading delimiter characters (slash / and asterisk *) has been tripped.
 *
 * @param {string} line - text of code line
 * @returns {object} ret - info about the line
 */
const splitCommentBlockLine = function REDO(line) {
	let comments = [];
	let ended = false;
	let code = null;

	let end = line.indexOf('*/');
	// If ending delimiter of comment block not found ...
	if (end == -1) {
		// Treat the whole line as part(line) of continous comment.
		comments.push(line);

		// And, the comment block not ended.
		ended = false;
	}
	// If ending delimiter of comment block found ...
	else {
		// The comment block is ended temporarily.
		// ATTENTION: It may be opened again.
		ended = true;

		// Get the text before the ending delimiter firstly.
		let comment = line.slice(0, end);
		comments.push(comment);

		// Then, get the remainder of the line.
		// Here, 2 equals the length of the ending delimiter.
		let remainder = line.slice(end + 2).trimLeft();

		// If the remainder starts like a comment block,
		if (remainder.startsWith('/*')) {
			// recursively parse the remainder.
			// Here, 2 equals the length of the starting delimiter.
			let line = remainder.slice(2);
			let ret = REDO(line);
			comments = comments.concat(ret.comments);
			code = ret.code;
			ended = ret.ended;
		}

		// If the remainder is line comment, get it.
		else if (remainder.startsWith('//')) {
			// Here, 2 equals the length of line comment identifier.
			comments.push(remainder.slice(2));
		}

		// Otherwise, the remainder is regarded as normal code.
		else if (remainder) {
			code = remainder;
		}
	}

	return {
		// Remainded code.
		code,

		// Array of comment pieces.
		comments,

		// If the comment block ended in this line.
		ended
	};
};

module.exports = function runRuleTester(pathname) {
	// Read examples.
	const codeLines = fs.readFileSync(pathname, 'utf8').split(SEP);

	// ---------------------------
	// STEP 1. Get comment paragraphs and their range [start, end).

	let commentParagraphList = [];
	for (let i = 0, continousComments = [], isCommentBlock = false, range; i < codeLines.length; i++) {
		// Update the starting point of range.
		if (continousComments.length == 0) {
			range = [i];
		}

		let line = codeLines[i].trimLeft();

		// If the previous line ends with not-ended block comment,
		// or cuurent line starts as comment block do.
		if (isCommentBlock || line.startsWith('/*')) {
			let ret = splitCommentBlockLine(isCommentBlock ? line : line.slice(2));
			continousComments = continousComments.concat(ret.comments);
			isCommentBlock = !ret.ended;
		}

		// If the current line is line comment.
		else if (line.startsWith('//')) {
			continousComments.push(line.slice(2));
		}

		// If current line does not start with comment meanwhile the previous one does,
		// it means that the comment paragraph is ended.
		else if (continousComments.length) {
			range[1] = i;
			commentParagraphList.push({
				range,
				lines: continousComments
			});

			// Reset the range and container.
			range = [];
			continousComments = [];
		}
	}

	// ---------------------------
	// STEP 2. Parse the comment paragraphs to structured meta.

	let unitList = [];
	for (let i = 0, preInfo, codeRange = []; i < commentParagraphList.length; i++) {
		let para = commentParagraphList[i];
		let meta = parseCommentParagraph(para.lines);
		if (meta) {
			unitList.push({
				meta,
				range: para.range
			});
		}
	}

	// ---------------------------
	// STEP 3. Match the meta and code.

	let demoList = [];
	for (let i = 0, L = unitList.length; i < L; i++) {
		let unit = unitList[i], meta = unit.meta;

		// Get code lines next to meta comment paragraph.

		let begin = unit.range[1];
		let end = (i < L - 1) ? unitList[i+1].range[0] : codeLines.length;

		// Ignore the leading empty lines.
		while (begin < end && codeLines[begin].trim() === '') {
			begin++;
		}
		// Ignore the following empty lines.
		while (begin < end && codeLines[end-1].trim() === '') {
			end--;
		}

		meta.code = codeLines.slice(begin, end).join(SEP);
		if (meta._expect === 'bad') {
			if (typeof meta.errors === 'undefined') {
				meta.errors = [ {} ];
			}
			else if (typeof meta.errors === 'number') {
				let n = meta.errors;
				meta.errors = new Array(meta.errors).fill({});
			}
			else if (!(meta.errors instanceof Array)) {
				meta.errors = [ meta.errors ];
			}
		}
		delete meta._expect;

		demoList.push(meta);
	}

	return demoList;
};
