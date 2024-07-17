const LANGUAGE_SWITCHER_ELEMENTS =
  document.querySelectorAll('.language-switcher');
const HAMBURGER_MENU_BTN = document.querySelector('.hamburger-menu-btn');
const LINK_SET_LANG_EN = document.querySelector('.set-lang-english');
const LINK_SET_LANG_RU = document.querySelector('.set-lang-russian');

LANGUAGE_SWITCHER_ELEMENTS.forEach((el) =>
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    e.currentTarget.classList.toggle('open');
  }),
);

HAMBURGER_MENU_BTN.addEventListener('click', (e) => {
  e.stopPropagation();
  e.currentTarget.classList.toggle('active');
});

document.body.addEventListener('click', () => {
  LANGUAGE_SWITCHER_ELEMENTS.forEach((e) => {
    e.classList.remove('open');
  });
  HAMBURGER_MENU_BTN.classList.remove('active');
});

const currentPath = window.location.pathname;
const userLang = localStorage.getItem('userLang');

if (!userLang) {
  const systemLang = navigator.language || navigator.userLanguage;
  const langSystem = systemLang.startsWith('ru') ? 'ru' : 'en';
  const langDocument = document.documentElement.lang;

  if (langSystem !== langDocument) {
    setUserLanguage(lang);
  }
}

function setUserLanguage(lang) {
  localStorage.setItem('userLang', lang);
  const newPath = `/${lang}/${currentPath}`;
  window.location.href = newPath;
}

LINK_SET_LANG_EN.addEventListener('click', () => {
  setUserLanguage('en');
});

LINK_SET_LANG_RU.addEventListener('click', () => {
  setUserLanguage('ru');
});
