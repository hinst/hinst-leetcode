import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MaxChainPublic as MaxChain } from './main.mjs';

function deleteOnce<T>(input: T[], removedItem: T): T[] {
	let once = true;
	return input.filter(function(item) {
		if (once && item === removedItem) {
			once = false;
			return false;
		}
		return true;
	});
}

describe(MaxChain.name, function() {
	it('1', function() {
		const maxChain = new MaxChain();
		let input = [8, 1, 4, 8, 16, 32, 11, 0, 0, 11];
		for (const item of input)
			maxChain.add(item);
		input.sort(function(a, b) { return b - a; });
		assert.deepEqual(maxChain.toArray(), input);

		input = deleteOnce(input, 11);
		maxChain.delete(11);
		assert.deepEqual(maxChain.toArray(), input);
		input = deleteOnce(input, 32);
		maxChain.delete(32);
		assert.deepEqual(maxChain.toArray(), input);
	});
});
