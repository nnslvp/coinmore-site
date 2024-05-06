
const languageSwitcherElements = document.querySelectorAll(
	'.language-switcher'
);

languageSwitcherElements.forEach(el =>
	el.addEventListener('click', e => {
		e.stopPropagation();
		e.currentTarget.classList.toggle('open');
	})
);

document.body.addEventListener('click', () => {
	languageSwitcherElements.forEach(e => {
		e.classList.remove('open');
	});
});

document
	.querySelector('.hamburger-menu-btn')
	.addEventListener('click', function (e) {
		e.currentTarget.classList.toggle('active');
	});
