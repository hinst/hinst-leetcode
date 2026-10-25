import { describe, it } from 'node:test';
import assert from 'node:assert';
import { PrefixTreeExported as PrefixTree } from './main.mjs';

describe('PrefixTree', () => {
	it('search word', () => {
		const tree = new PrefixTree();
		tree.add('cat');
		tree.add('catharsis');
		tree.add('catapult');
		assert.equal(true, tree.find('cat'));
		assert.equal(true, tree.find('catapult'));
		assert.notEqual(true, tree.find('cata'));
		assert.notEqual(true, tree.find('calf'));
		assert.notEqual(true, tree.find('catcat'));
		assert.notEqual(true, tree.find('amoeba'));
	});
});
