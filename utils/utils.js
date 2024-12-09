import { parseArgs } from "jsr:@std/cli";

export async function getInput() {
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
			const file = Deno.lstatSync(flags.input);

			if (!file.isFile) {
				console.error("[Error]:", flags.input, "is not a file");
				Deno.exit(1);
			}

			input = decoder.decode(Deno.readFileSync("input.txt"));
		} catch (_) {
			console.error("[Error]: No file exists", flags.input);
			Deno.exit(1);
		}
	}

	return input;
}
