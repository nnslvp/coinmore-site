ItcCustomSelect.create('#select-currency', {
	name: 'interval',
	placeholder: 'Select currency',
	targetValue: '',
	options: [
		['day', '24 hours'],
		['week', 'Week'],
	],
	onSelected(select, option) {
		// выбранное значение
		console.log(`Выбранное значение: ${select.value}`);
		// индекс выбранной опции
		console.log(`Индекс выбранной опции: ${select.selectedIndex}`);
		// выбранный текст опции
		const text = option ? option.textContent : '';
		console.log(`Выбранный текст опции: ${text}`);
	},
});
