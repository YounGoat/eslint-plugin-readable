/**
 * Demo for rule readable/loop-counter.
 */

// @good
for (var i = 0; i < array.length; i++) { array[i]; }

// @bad
for (var I = 0; I < array.length; I++) { array[I]; }
