const decoder = new TextDecoder("utf8");
const input = Deno.readFileSync("input.txt");

const data = decoder.decode(input);

const lists = data.split("\n");
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
