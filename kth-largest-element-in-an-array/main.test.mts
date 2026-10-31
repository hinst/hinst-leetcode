import { describe, it } from 'node:test';
import assert from 'node:assert';
import { findKthLargestPublic as findKthLargest } from './main.mjs';

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