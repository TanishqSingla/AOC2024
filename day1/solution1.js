import { parseArgs } from "jsr:@std/cli";

const decoder = new TextDecoder("utf8");
const flags = parseArgs(Deno.args);

let input;

if (!flags.input) {
	for await (const chunk of Deno.stdin.readable) {
		input = decoder.decode(chunk);
	}

	if (!input) {
		console.error("[Error]: Missing input");
		Deno.exit(1);
	}
} else {
	try {
		await Deno.lstat("input.txt");
		input = decoder.decode(Deno.readFileSync("input.txt"));
	} catch (err) {
		console.log("not exists!", err);
		Deno.exit(1);
	}
}

const lists = input.split("\n");
const firstList = [];
const secondList = [];

for (const line of lists) {
	const inputs = line.split(/\s+/);
	if (inputs.length != 2) continue;
	firstList.push(+inputs[0]);
	secondList.push(+inputs[1]);
}

firstList.sort((a, b) => a - b);
secondList.sort((a, b) => a - b);

let distance = 0;

for (let i = 0; i < firstList.length; i++) {
	distance += Math.abs(firstList[i] - secondList[i]);
}

console.log(distance);

const count = {};
for (const item of secondList) {
	if (!count[item]) count[item] = 1;
	else count[item]++;
}

let score = 0;
for (const item of firstList) {
	if (count[item]) score += item * count[item];
}
console.log(score);
