const decoder = new TextDecoder("utf8");
const input = await Deno.readFile("input.txt");

const data = decoder.decode(input);

const lists = data.split('\n');
const firstList = []
const secondList = []

for (const line of lists) {
	const inputs = line.split(/\s+/);
	if (inputs.length != 2) continue;
	firstList.push(+inputs[0]);
	secondList.push(+inputs[1]);
}

firstList.sort((a,b) => a - b);
secondList.sort((a,b) => a - b);

let distance = 0;
firstList.forEach((item, index) => {distance += Math.abs(item - secondList[index])});
console.log(distance);
