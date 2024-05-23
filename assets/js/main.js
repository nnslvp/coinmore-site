const LANGUAGE_SWITCHER_ELEMENTS = document.querySelectorAll(
	'.language-switcher'
);
const HAMBURGER_MENU_BTN = document.querySelector('.hamburger-menu-btn');

LANGUAGE_SWITCHER_ELEMENTS.forEach(el =>
	el.addEventListener('click', e => {
		e.stopPropagation();
		e.currentTarget.classList.toggle('open');
	})
);

HAMBURGER_MENU_BTN.addEventListener('click', e => {
  e.stopPropagation();
	e.currentTarget.classList.toggle('active');
});

document.body.addEventListener('click', () => {
	LANGUAGE_SWITCHER_ELEMENTS.forEach(e => {
		e.classList.remove('open');
	});
  HAMBURGER_MENU_BTN.classList.remove('active')
});
