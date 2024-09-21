/**Source: https://en.wikipedia.org/wiki/Heap%27s_algorithm */
class Permutator {
	constructor(
		private A: Uint16Array,
		private output: () => void,
	) {
	}

	generate(k: number) {
		if (k === 1)
			this.output();
		else {
			// Generate permutations with k-th unaltered
			// Initially k = length(A)
			this.generate(k - 1)

			// Generate permutations for k-th swapped with each k-1 initial
			for (let i = 0; i < k-1; i += 1) {
				// Swap choice dependent on parity of k (even or odd)
				if (k % 2 === 0)
					this.swap(i, k-1); // zero-indexed, the k-th is at k-1
				else
					this.swap(0, k-1);
				this.generate(k - 1)
			}
		}
	}

	private swap(a: number, b: number) {
		const buffer = this.A[a];
		this.A[a] = this.A[b];
		this.A[b] = buffer;
	}
}

function getIterable(a: number | Set<number>) {
	return typeof a === 'number' ? [a] : a;
}

function getSize(a: number | Set<number>) {
	return typeof a === 'number' ? 1 : a.size;
}

function checkHas(a: number | Set<number>, value: number) {
	return typeof a === 'number' ? a === value : a.has(value);
}

class App {
	constructor(s: string, private words: string[]) {
		this.matchedIndexes = App.createMatchedIndexes(s, words);
		this.currentIndexes = new Uint16Array(this.words.map((_, index) => index));
	}

	private readonly results = new Set<number>();
	private readonly matchedIndexes: Array<number | Set<number>>;
	private readonly currentIndexes: Uint16Array;

	private static createMatchedIndexes(s: string, wordArray: string[]): Array<number | Set<number>> {
		return new Array<number | Set<number>>(...wordArray.map(word => {
			const indexes = new Set<number>();
			for (
				let textIndex = s.indexOf(word);
				textIndex !== -1;
				textIndex = s.indexOf(word, textIndex + 1)
			)
				indexes.add(textIndex);
			return indexes.size > 1 ? indexes : indexes.values().next().value;
		}));
	}

	private check() {
		const firstIndex = this.currentIndexes[0];
		const matchedIndex = this.matchedIndexes[firstIndex];
		for (const characterIndex of getIterable(matchedIndex)) {
			if (this.currentIndexes.length === 1)
				this.results.add(characterIndex)
			else if (this.results.has(characterIndex))
				continue;
			else {
				let sumCharacterIndex = characterIndex;
				const lastIndex = this.currentIndexes.length - 1;
				for (let i = 1; i < this.currentIndexes.length; ++i) {
					const currentIndex = this.currentIndexes[i];
					const matchedIndex = this.matchedIndexes[currentIndex];
					const offest = this.words[currentIndex].length;
					sumCharacterIndex += offest;
					if (!checkHas(matchedIndex, sumCharacterIndex))
						break;
					if (i === lastIndex)
						this.results.add(characterIndex);
				}
			}
		}
	}

	findSubstring(): number[] {
		for (const matchedIndex of this.matchedIndexes)
			if (getSize(matchedIndex) === 0)
				return [];
		const permutator = new Permutator(this.currentIndexes, () => {});
		permutator.generate(this.words.length);
		return Array.from(this.results);
	}
}

function findSubstring(s: string, words: string[]): number[] {
	if (s === words.join(''))
		return [0];
	return new App(s, words).findSubstring();
}

function main() {
	let s: string;
	let words: string[];

	s = "pjzkrkevzztxductzzxmxsvwjkxpvukmfjywwetvfnujhweiybwvvsrfequzkhossmootkmyxgjgfordrpapjuunmqnxxdrqrfgkrsjqbszgiqlcfnrpjlcwdrvbumtotzylshdvccdmsqoadfrpsvnwpizlwszrtyclhgilklydbmfhuywotjmktnwrfvizvnmfvvqfiokkdprznnnjycttprkxpuykhmpchiksyucbmtabiqkisgbhxngmhezrrqvayfsxauampdpxtafniiwfvdufhtwajrbkxtjzqjnfocdhekumttuqwovfjrgulhekcpjszyynadxhnttgmnxkduqmmyhzfnjhducesctufqbumxbamalqudeibljgbspeotkgvddcwgxidaiqcvgwykhbysjzlzfbupkqunuqtraxrlptivshhbihtsigtpipguhbhctcvubnhqipncyxfjebdnjyetnlnvmuxhzsdahkrscewabejifmxombiamxvauuitoltyymsarqcuuoezcbqpdaprxmsrickwpgwpsoplhugbikbkotzrtqkscekkgwjycfnvwfgdzogjzjvpcvixnsqsxacfwndzvrwrycwxrcismdhqapoojegggkocyrdtkzmiekhxoppctytvphjynrhtcvxcobxbcjjivtfjiwmduhzjokkbctweqtigwfhzorjlkpuuliaipbtfldinyetoybvugevwvhhhweejogrghllsouipabfafcxnhukcbtmxzshoyyufjhzadhrelweszbfgwpkzlwxkogyogutscvuhcllphshivnoteztpxsaoaacgxyaztuixhunrowzljqfqrahosheukhahhbiaxqzfmmwcjxountkevsvpbzjnilwpoermxrtlfroqoclexxisrdhvfsindffslyekrzwzqkpeocilatftymodgztjgybtyheqgcpwogdcjlnlesefgvimwbxcbzvaibspdjnrpqtyeilkcspknyylbwndvkffmzuriilxagyerjptbgeqgebiaqnvdubrtxibhvakcyotkfonmseszhczapxdlauexehhaireihxsplgdgmxfvaevrbadbwjbdrkfbbjjkgcztkcbwagtcnrtqryuqixtzhaakjlurnumzyovawrcjiwabuwretmdamfkxrgqgcdgbrdbnugzecbgyxxdqmisaqcyjkqrntxqmdrczxbebemcblftxplafnyoxqimkhcykwamvdsxjezkpgdpvopddptdfbprjustquhlazkjfluxrzopqdstulybnqvyknrchbphcarknnhhovweaqawdyxsqsqahkepluypwrzjegqtdoxfgzdkydeoxvrfhxusrujnmjzqrrlxglcmkiykldbiasnhrjbjekystzilrwkzhontwmehrfsrzfaqrbbxncphbzuuxeteshyrveamjsfiaharkcqxefghgceeixkdgkuboupxnwhnfigpkwnqdvzlydpidcljmflbccarbiegsmweklwngvygbqpescpeichmfidgsjmkvkofvkuehsmkkbocgejoiqcnafvuokelwuqsgkyoekaroptuvekfvmtxtqshcwsztkrzwrpabqrrhnlerxjojemcxel";
	words = ["dhvf","sind","ffsl","yekr","zwzq","kpeo","cila","tfty","modg","ztjg","ybty","heqg","cpwo","gdcj","lnle","sefg","vimw","bxcb"];
	console.log(findSubstring(s, words));
	console.warn('---');
}
main();