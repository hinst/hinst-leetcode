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
	it('delete1', () => {
		const tree = new PrefixTree();
		tree.add('cat');
		tree.add('catharsis');
		assert.equal(tree.find('cat'), true);
		assert.notEqual(tree.find('cato'), true);
		assert.equal(tree.delete('cat'), true);
		assert.notEqual(tree.find('cat'), true);
		assert.equal(tree.find('catharsis'), true);
	});
	it('delete2', () => {
		const tree = new PrefixTree();
		tree.add('cat');
		tree.add('catharsis');
		assert.equal(tree.delete('catharsis'), true);
		assert.equal(tree.find('cat'), true);
		assert.notEqual(tree.find('catharsis'), true);
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
