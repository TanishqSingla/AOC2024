// Part 2

import { getInput } from "../utils/utils.js";

const input = await getInput();

const lines = input.split("\n");

lines.pop();

let safeReportsCount = 0;

const isSafe = (numbers) => {

	let previous;
	let isIncreasing;
	let safe = true;
	for (const number of numbers) {
		if (typeof previous === 'undefined') { previous = +number; continue }

		const difference = (+number) - previous;
		if (Math.abs(difference) > 3 || difference == 0) { safe = false; break; }

		if (typeof isIncreasing === 'undefined') { isIncreasing = difference < 0 ? -1 : 1; };

		if ((isIncreasing == 1 && difference < 0) || (isIncreasing == -1 && difference > 0)) { safe = false; break; }

		previous = +number;
	}

	return safe;
}

for (const line of lines) {
	const numbers = line.trim().split(/\s+/);

	if (isSafe(numbers)) {safeReportsCount++; continue; };

	for(let i = 0; i < numbers.length; i++) {
		const temp = numbers.slice();
		temp.splice(i,1);
		if (isSafe(temp)) { safeReportsCount++; break; }
	}
}

console.log(safeReportsCount)
