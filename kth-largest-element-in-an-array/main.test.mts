import { describe, it } from 'node:test';
import assert from 'node:assert';
import { findIndexPublic as findIndex, findKthLargestPublic as findKthLargest } from './main.mjs';

describe(findIndex.name, function() {
	it(findIndex.name, function() {
		const array = [1, 2, 2, 16, 16, 32];
		assert.equal(findIndex(array, 20), 5);
		assert.equal(findIndex(array, 32), 5);
		assert.equal(findIndex(array, 42), 6);
		assert.equal(findIndex(array, 1), 0);
		assert.equal(findIndex(array, -1), 0);
		assert.equal(findIndex(array, 2), 2);
		assert.equal(findIndex(array, 10), 3);
	});
	it(findIndex.name + '2', function() {
		const array = [5, 6];
		assert.equal(findIndex(array, 4), 0);
	});
});

describe(findKthLargest.name, function() {
	it('1', function() {
		const nums = [3,2,1,5,6,4], k = 2;
		assert.equal(findKthLargest(nums, k), 5);
	});

	it('2', function() {
		const nums = [3,2,3,1,2,4,5,5,6], k = 4;
		assert.equal(findKthLargest(nums, k), 4);
	});
});