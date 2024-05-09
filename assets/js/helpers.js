function shortenHm(hashRate, roundPlaces) {
	const denominator = [
		{ d: 1000000000000, unit: 'TH' },
		{ d: 1000000000, unit: 'GH' },
		{ d: 1000000, unit: 'MH' },
		{ d: 1, unit: 'H' },
	];

	if (isNaN(hashRate)) {
		return null;
	} else {
		const hashRateFactor = Math.log10(hashRate) > 0 ? Math.log10(hashRate) : 0;

		const factor = denominator.find(
			el => hashRateFactor - Math.log10(el.d) >= 0
		);

		const resultHashRateValue = Number(
			(hashRate / factor.d).toFixed(roundPlaces)
		);
		const resultHashRateMeasure = factor.unit;

		return {
			hashrate: resultHashRateValue,
			units: resultHashRateMeasure,
		};
	}
}
