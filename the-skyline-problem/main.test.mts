import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MaxChainPublic as MaxChain } from './main.mjs';

describe(MaxChain.name, function() {
	it('1', function() {
		const maxChain = new MaxChain();
		const input = [8, 1, 4, 8, 16, 32, 11, 0, 0, 11];
		for (const item of input)
			maxChain.add(item);
		input.sort(function(a, b) { return b - a; });
		assert.deepEqual(maxChain.toArray(), input);
	});
});
