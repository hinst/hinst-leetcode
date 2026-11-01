import { describe, it } from 'node:test';
import assert from 'node:assert';
import { findIndexPublic as findIndex } from './main.mjs';

describe(findIndex.name, () => {
	function test123(value: number, expectedIndex: number) {
		it('' + value, () => {
			assert.equal(findIndex([1, 2, 3], value), expectedIndex);
		});
	}
	test123(1, 0);
	test123(2, 1);
	test123(3, 2);
	test123(1.1, 0);
	test123(1.9, 1);
	test123(2.1, 1);
	test123(2.5, 1);
	test123(2.9, 2);
	test123(3.1, 2);
	test123(300, 2);
});