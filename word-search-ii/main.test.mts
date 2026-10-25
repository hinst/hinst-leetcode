import { describe, it } from 'node:test';
import assert from 'node:assert';
import { PrefixTreeExported as PrefixTree, findWordsExported as findWords } from './main.mjs';

describe('PrefixTree', () => {
	it('find', () => {
		const tree = new PrefixTree();
		tree.add('cat');
		tree.add('catharsis');
		tree.add('catapult');
		assert.equal(tree.find('cat'), true);
		assert.equal(tree.find('catapult'), true);
		assert.notEqual(tree.find('cata'), true);
		assert.notEqual(tree.find('calf'), true);
		assert.notEqual(tree.find('catcat'), true);
		assert.notEqual(tree.find('amoeba'), true);
	});
});

describe('findWords', () => {
	it('spiralShaped', () => {
		const board = [["a","b","c"],
					   ["a","e","d"],
					   ["a","f","g"]];
		const words = ["eaabcdgfa"];
		assert.deepEqual(findWords(board, words), words);
	});
});
