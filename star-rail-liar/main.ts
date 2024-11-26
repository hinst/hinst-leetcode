import { nextPermutation as nextPermutationN } from './permutation.ts';

enum Person {
	Howard = 'Howard',
	Philip = 'Philip',
	Joyce = 'Joyce',
}

enum Designation {
	Good,
	Bad,
	Liar,
}

function designationToString(designation: Designation) {
	switch (designation) {
		case Designation.Good:
			return 'Good';
		case Designation.Bad:
			return 'Bad';
		case Designation.Liar:
			return 'Liar';
		default:
			return '';
	}
}

type Possibility = Record<Person, Designation>;

function statementJoyce(possibility: Possibility): boolean {
	return possibility[Person.Philip] === Designation.Good ||
		possibility[Person.Philip] === Designation.Bad;
}

function statementPhilip(possibility: Possibility): boolean {
	return possibility[Person.Howard] === Designation.Good ||
		possibility[Person.Joyce] === Designation.Good;
}

type StatementFunction = (possibility: Possibility) => boolean;

const statements: Record<Person, StatementFunction | undefined> = {
	[Person.Howard]: undefined,
	[Person.Philip]: statementPhilip,
	[Person.Joyce]: statementJoyce,
}

function nextPermutation(designations: Designation[]) {
	if (designations.length === 0) {
		designations.push(Designation.Good, Designation.Bad, Designation.Liar);
		return true;
	} else
		return nextPermutationN(designations);
}

export function solve(): Possibility[] {
	const results: Possibility[] = [];
	const designations: Designation[] = [];
	while (nextPermutation(designations)) {
		const possibility: Record<Person, Designation> = {
			[Person.Howard]: designations[0],
			[Person.Philip]: designations[1],
			[Person.Joyce]: designations[2],
		};
		let haveError = false;
		for (const item of Object.entries(possibility)) {
			const person = item[0] as Person;
			const designation = item[1];
			const statement = statements[person];
			const isOkay = statement === undefined ||
				designation === Designation.Good && statement(possibility) ||
				designation === Designation.Bad && !statement(possibility) ||
				designation === Designation.Liar;
			if (!isOkay)
				haveError = true;
		}
		if (!haveError)
			results.push(Object.assign({}, possibility));
	}
	return results;
}

if (import.meta.main) {
	const possibilities = solve();
	console.log(possibilities.length);
	for (const possibility of possibilities) {
		console.log('Possibility');
		for (const entry of Object.entries(possibility))
			console.log(entry[0], designationToString(entry[1]));
	}
}
