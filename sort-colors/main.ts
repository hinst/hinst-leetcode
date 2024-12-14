function sortColors(items: number[]) {
	let zeroCount = 0;
	let oneCount = 0;
	let twoCount = 0;
	for (const item of items) {
		switch (item) {
			case 0:
				++zeroCount;
				break;
			case 1:
				++oneCount;
				break;
			case 2:
				++twoCount;
				break;
		}
	}
	let index = 0;
	for (let i = 0; i < zeroCount; ++i)
		items[index++] = 0;
	for (let i = 0; i < oneCount; ++i)
		items[index++] = 1;
	for (let i = 0; i < twoCount; ++i)
		items[index++] = 2;
}

if (import.meta.main) {
	const items = [2,0,2,1,1,0];
	sortColors(items);
	console.log(items);
}
