import { getInput } from "../utils/utils.js";

const input = await getInput();

const lines = input.split("\n");

lines.pop();

let safeReportsCount = 0;

for (const line of lines) {
	const numbers = line.trim().split(/\s+/);

	let previous;
	let isIncreasing;
	let safe = true;
	for (const number of numbers) {
		if (typeof previous === 'undefined') { previous = +number; continue }
		
		const difference = (+number) - previous;
		if (Math.abs(difference) > 3 || difference == 0) { safe = false; break; }

		if(typeof isIncreasing === 'undefined') {isIncreasing = difference < 0 ? -1 : 1;};

		if ((isIncreasing == 1 && difference < 0) || (isIncreasing == -1 && difference > 0)) { safe = false; break; }

		previous = +number;
	}

	if (safe) { safeReportsCount++; }
}

console.log(safeReportsCount)
