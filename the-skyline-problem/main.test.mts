import { MaxChainPublic as MaxChain } from './main.mjs';

const maxChain = new MaxChain();
for (const item of [8, 1, 4, 8, 16, 32, 11, 0, 0, 11]) {
	maxChain.add(item);
}
console.log(maxChain.toArray());