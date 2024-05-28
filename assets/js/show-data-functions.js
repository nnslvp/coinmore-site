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
function showPoolFee(fee, id = 'pool_fee') {
	document.getElementById(id).textContent = `${fee}%`;
}

function showNetworkHashrate(hashrate, id = 'network_hashrate') {
	const { hashrate: shortHashrate, units } = shortenHm(hashrate, 2);
	document.getElementById(id).textContent = `${shortHashrate} ${units}/s`;
}

function showRate(rate, id = 'coin-price') {
	document.getElementById(id).textContent = `$${rate}`;
}

function showMyPayouts(amount, id = 'my_payouts_1h', symbol) {
	const amountValue = parseFloat(amount).toFixed(8);
	document.getElementById(id).textContent = `${amountValue} ${symbol}`;
}

function showMyPayoutsUSD(amount, currencyRate, id = 'my_payouts_1h_usd') {
	document.getElementById(id).textContent = `${amountUSD(
		amount,
		currencyRate
	)} USD`;
}

function showMyBalance(myBalanceData, id = 'balance', symbol) {
	const amount = parseFloat(myBalanceData?.amount).toFixed(8);
	document.getElementById(id).textContent = `${amount} ${symbol}`;
}

function showMyBalanceUSD(myBalanceData, currencyRate, id = 'balance_usd') {
	document.getElementById(id).textContent = `${amountUSD(
		myBalanceData?.amount,
		currencyRate
	)} USD`;
}
