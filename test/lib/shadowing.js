'use strict';

var MODULE_REQUIRE
	/* built-in */
	, assert = require('assert')

	/* NPM */

	/* in-package */
	, shadowing = require('../../lib/shadowing')
	;

describe('shadowing', () => {

	let valids = [
		[ {}, {} ],
		[ { gender: 'm' }, {} ],
		[ { linkman: { gender: undefined } }, { linkman: { gender: shadowing.EXIST } } ],

		[ [ 1, 2, 3 ], [ 1 ] ],
		[ [ { gender: 'm' }, { gender: 'f' } ], [ { gender: 'f' } ] ],

		[ [ 1 ], [ shadowing.OR(1, true) ], 'shadowing.OR()' ],
		[
			{ gender: 'm' },
			{ gender: shadowing.AND('m', new shadowing.Shadow(function(value) { return value.length == 1; })) },
			'shadowing.AND()'
		],
	];

	let invalids = [
		[ null, {}, 'null vs. {}' ],
		[ {}, { linkman: { gender: 'm' } } ],
		[ { gender: 'm' }, { gender: 'f' } ],
		[ [ 1, 2, 3 ], [ 4 ] ],
		[ [ { gender: 'm' }, { gender: 'f' } ], [ { gender: 'M' } ] ]
	];

	valids.forEach((valid, i) =>  {
		it(valid[2] ? valid[2] : `valid ${i}`, function() {
			assert.ok(shadowing(valid[0], valid[1]), i);
		});
	});

	invalids.forEach((invalid, i) => {
		it(invalid[2] ? invalid[2] : `invalid ${i}`, function() {
			assert.strictEqual(shadowing(invalid[0], invalid[1]), false, i);
		});
	});
});
