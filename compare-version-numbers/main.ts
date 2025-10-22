function compareVersion(version1: string, version2: string): number {
	const parts1 = version1.split('.');
	const parts2 = version2.split('.');
	while (parts1.length < parts2.length)
		parts1.push('0');
	while (parts2.length < parts1.length)
		parts2.push('0');
	for (let i = 0; i < parts1.length; ++i) {
		while (parts1[i].length < parts2[i].length)
			parts1[i] = '0' + parts1[i];
		while (parts2[i].length < parts1[i].length)
			parts2[i] = '0' + parts2[i];
	}
	version1 = parts1.join('.');
	version2 = parts2.join('.');
	return version1 === version2 
		? 0 
		: version1 < version2 
			? -1 
			: 1;
}

if (import.meta.main) {
	console.log(compareVersion("1.2", "1.10"));
}
