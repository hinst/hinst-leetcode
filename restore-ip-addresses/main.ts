function restoreIpAddresses(s: string): string[] {
	const results: string[] = [];
	restore(s, [], 0, results);
	return results;
}

function restore(text: string, ongoing: number[], index: number, results: string[]) {
	if (index === text.length) {
		if (ongoing.length === 4)
			results.push(ongoing.join('.'));
		return;
	}
	for (let i = 1; i <= 3; ++i) {
		const endIndex = index + i;
		if (endIndex <= text.length) {
			const part = text.substring(index, endIndex);
			const hasLeadingZeroes = part.startsWith('0') && part.length > 1;
			if (!hasLeadingZeroes) {
				const integerPart = parseInt(part);
				if (integerPart <= 255) {
					ongoing.push(integerPart);
					restore(text, ongoing, endIndex, results);
					ongoing.pop();
				}
			}
		} else
			break;
	}
}

if (import.meta.main) {
	console.log(restoreIpAddresses('101023'));
}
