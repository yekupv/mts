export function findMaxAndMin(arr: any): number[] {
	let max = extractNumberFromString(arr[0].currentPrice);
	let min = extractNumberFromString(arr[0].currentPrice);

	for (let i = 1; i < arr.length; i++) {
		const currentPrice = extractNumberFromString(arr[i].currentPrice);

		if (currentPrice > max) {
			max = currentPrice;
		}

		if (currentPrice < min) {
			min = currentPrice;
		}
	}

	return [max, min];
}

export function extractNumberFromString(input: string): number | null {
	// Remove spaces and use regular expressions to extract the number part
	const sanitizedInput = input.replace(/\s+/g, "");
	const matches = sanitizedInput.match(/\d+/);

	// If there are no matches, return null
	if (!matches) {
		return null;
	}

	// Convert the matched string to a number
	const number = parseInt(matches[0], 10);

	// Check if the conversion resulted in a valid number
	if (!isNaN(number)) {
		return number;
	} else {
		return null;
	}
}

export function extractStringFromValue(input: string): string {
	// Remove spaces between numbers
	const stringWithoutSpaces = input.replace(/\s+/g, "");

	// Use regular expressions to extract the string part
	const matches = stringWithoutSpaces.match(/[^\d]+/);

	// If there are no matches, return the original input string
	if (!matches) {
		return input;
	}

	// Return the matched string
	return matches[0];
}
