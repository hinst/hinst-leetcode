import { describe, it } from 'node:test';
import assert from 'node:assert';
import { findIndexPublic as findIndex } from './main.mjs';

describe('findIndex', function() {
	it('find', function() {
		const array = [1, 2, 2, 16, 16, 32];
		assert.equal(findIndex(array, 0, array.length - 1, 20), 5);
	});
});
