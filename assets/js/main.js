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

let currentPath = window.location.pathname;
let userLang = localStorage.getItem('userLang');

if (!userLang) {
  let systemLang = navigator.language || navigator.userLanguage;
  let lang = systemLang.startsWith('ru') ? 'ru' : 'en';

  if (!currentPath.includes(lang)) {
    let newPath = `/${lang}/${currentPath}`;
    window.location.href = newPath;
  }
}

function setUserLanguage(lang) {
  localStorage.setItem('userLang', lang);
  let newPath = `/${lang}/${currentPath}`;
  window.location.href = newPath;
}

LINK_SET_LANG_EN.addEventListener('click', () => {
  setUserLanguage('en');
});

LINK_SET_LANG_RU.addEventListener('click', () => {
  setUserLanguage('ru');
});
