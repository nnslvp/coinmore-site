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

function getTabs(containerSelector) {
	const container = document.querySelector(containerSelector);
	const tabs = container.querySelectorAll('.tab');
	return tabs;
}

function activateTabsOnClick(containerSelector) {
	const tabs = getTabs(containerSelector);

	tabs.forEach(tab => {
		tab.addEventListener('click', e => {
			tabs.forEach(t => t.classList.remove('active'));
			e.currentTarget.classList.add('active');
		});
	});
}

function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; Max-Age=-99999999;';
}

function formatDate(dateString) {
	const date = new Date(dateString);
	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const year = String(date.getUTCFullYear()).slice(-2);
	return `${day}.${month}.${year}`;
}
