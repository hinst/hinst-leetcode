import { describe, it } from 'node:test';
import assert from 'node:assert';
import { findIndexPublic as findIndex, findKthLargestPublic as findKthLargest } from './main.mjs';

describe(findIndex.name, function() {
	it(undefined, function() {
		const array = [1, 2, 2, 16, 16, 32];
		assert.equal(findIndex(array, 0, array.length - 1, 20), 5);
		assert.equal(findIndex(array, 0, array.length - 1, 32), 5);
		assert.equal(findIndex(array, 0, array.length - 1, 42), 6);
		assert.equal(findIndex(array, 0, array.length - 1, 1), 0);
		// assert.equal(findIndex(array, 0, array.length - 1, -1), 0);
		assert.equal(findIndex(array, 0, array.length - 1, 2), 2);
		assert.equal(findIndex(array, 0, array.length - 1, 10), 3);
	});
});

describe(findKthLargest.name, function() {
});