const COPY_BUTTONS_INSIDE_CODE_WRAPPER = document.querySelectorAll(
	'.code-wrapper .btn-copy '
);
const TABS = document.querySelectorAll('.tabs-miners-item');
const GUIDES = document.querySelectorAll('.guide');

COPY_BUTTONS_INSIDE_CODE_WRAPPER.forEach(btn => {
	btn.addEventListener('click', event => {
		const { currentTarget } = event;
		const copyText = btn.closest('.code-wrapper').querySelector('code')
			.textContent;

		try {
			navigator.clipboard.writeText(copyText);
			// currentTarget.classList.add('copied');
			// setTimeout(() => {
			// 	currentTarget.classList.remove('copied');
			// }, 1000);
		} catch (err) {}
	});
});

TABS.forEach(tab => {
	tab.addEventListener('click', event => {
		TABS.forEach(t => t.classList.remove('active'));
		GUIDES.forEach(g => g.classList.remove('active'));

		event.currentTarget.classList.add('active');

		const guideId = event.currentTarget.getAttribute('data-target');
		const guide = document.getElementById(guideId);
		guide.classList.add('active');
	});
});

showPings();
