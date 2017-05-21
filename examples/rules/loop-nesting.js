/**
 * Demo for rule readable/loop-nesting
 */

/**
 * @good
 * @options.max = 5
 * @desc = '5-layer nested loop (max 5)'
 */

// LOOP 1
for (var i = 0; i < 10; i++) {
	// LOOP 2
	for (var j = 0; j < 10; j++) {
		// LOOP 3
		var k = 0;
		while (k++ < 10) {
			// LOOP 4
			var l = 0
			do {
				// LOOP 5
				for (var m = 0; m < 10; m++) {
				}
			} while(++l < 10)
		}
	}
}

/**
 * @bad
 * @options.max = 4
 * @desc = '5-layer nested loop (max 4)'
 */

// LOOP 1
for (var i = 0; i < 10; i++) {
	// LOOP 2
	for (var j = 0; j < 10; j++) {
		// LOOP 3
		var k = 0;
		while (k++ < 10) {
			// LOOP 4
			var l = 0
			do {
				// LOOP 5
				for (var m = 0; m < 10; m++) {
				}
			} while(++l < 10)
		}
	}
}
