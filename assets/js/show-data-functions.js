function showPoolHashrate(hashrate, id = 'pool_hashrate') {
	const { hashrate: shortHashrate, units } = shortenHm(hashrate, 2);
	document.getElementById(id).textContent = `${shortHashrate} ${units}/s`;
}

function showPoolProfit(profit, id = 'pool_profit', symbol) {
	const roundProfit = parseFloat(profit).toFixed(4);
	document.getElementById(id).textContent = `${roundProfit} ${symbol}`;
}

function showMinersOnline(workers_online, id = 'miners') {
	document.getElementById(id).textContent = workers_online;
}

function showPool24hBlocks(blocksCount, id = '24h_blocks') {
	document.getElementById(id).textContent = blocksCount;
}

function showPoolLatestBlockAt(date, id = 'latest_block_at') {
	const current = new Date();
	const at = new Date(date);
	const hours = (Math.abs(current - at) / 36e5).toFixed(2);

	document.getElementById(id).textContent = `${hours} hour(s)`;
}

function showPoolProfitUSD(rate, profit, id = 'pool_profit_usd') {
	const floatProfit = parseFloat(profit);
	const floatRate = parseFloat(rate);
	const profitUSD = (floatProfit * floatRate).toFixed(4);

	document.getElementById(id).textContent = `${profitUSD} USD`;
}

function showPoolMinPayoutUSD(rate, minPayout, id = 'pool_profit_usd') {
	const floatProfit = parseFloat(minPayout);
	const floatRate = parseFloat(rate);
	const profitUSD = (floatProfit * floatRate).toFixed(4);
	document.getElementById(id).textContent = `${profitUSD} USD`;
}

function showPoolMinPayout(minPayout, id = 'pool_min_payout', symbol) {
	document.getElementById(id).textContent = `${minPayout}  ${symbol}`;
}

function showNetworkHashrate(hashrate, id = 'network_hashrate') {
	const { hashrate: shortHashrate, units } = shortenHm(hashrate, 2);
	document.getElementById(id).textContent = `${shortHashrate} ${units}/s`;
}

function showRate(rate, id = 'coin-price') {
	document.getElementById(id).textContent = `$${rate}`;
}
