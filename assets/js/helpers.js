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

function deepMerge(target, source) {
	Object.keys(source).forEach(key => {
		if (source[key] && typeof source[key] === 'object') {
			target[key] = target[key] || (Array.isArray(source[key]) ? [] : {});
			deepMerge(target[key], source[key]);
		} else {
			target[key] = source[key];
		}
	});
	return target;
}

function amountUSD(amountInAlph, currencyRate) {
	return (parseFloat(amountInAlph) * currencyRate).toFixed(2);
}

const calculateHashrate = (sum_difficulty, period) =>
	(sum_difficulty * 16.0 * 2 ** 30) / period / 1000000;

const calculatePoolHashrate = (poolHistory, period) =>
	poolHistory.pool_history.map(({ sum_difficulty }) => {
		const hashrate = calculateHashrate(sum_difficulty, period);
		return Math.round(hashrate);
	});

function calculateTotalByKey(items, key) {
	return items.reduce((accumulator, item) => {
		return accumulator + parseFloat(item[key] || 0);
	}, 0);
}
