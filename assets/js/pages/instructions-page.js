const COPY_BUTTONS_INSIDE_CODE_WRAPPER = document.querySelectorAll(
  '.code-wrapper .btn-copy ',
);
const TABS = document.querySelectorAll('.tabs-miners-item');
const GUIDES = document.querySelectorAll('.guide');
const CODE_WRAPPERS = document.querySelectorAll('.guide pre');

CODE_WRAPPERS.forEach((codeWrapper) => {
  const button = document.createElement('button');
  button.className = 'btn btn-copy copy-code-btn';
  button.innerHTML = '<i class="icon copy-icon"></i>';
  codeWrapper.appendChild(button);
  button.addEventListener('click', function (event) {
    copyCodeToClipboard(button);
  });
});

function copyCodeToClipboard(button) {
  const copyText = button.closest('pre').querySelector('code').textContent;
  try {
    navigator.clipboard.writeText(copyText);
  } catch (err) {
    console.info('Failed to copy text:', err);
  }
}

TABS.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    TABS.forEach((t) => t.classList.remove('active'));
    GUIDES.forEach((g) => g.classList.remove('active'));

    event.currentTarget.classList.add('active');

    const guideId = event.currentTarget.getAttribute('data-target');
    const guide = document.getElementById(guideId);
    guide.classList.add('active');
  });
});
