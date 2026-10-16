const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
document.getElementById('copyIp').addEventListener('click', async () => {
  const ip = document.getElementById('serverIp').textContent.trim();
  if (ip === 'play.yourserver.net') {
    showToast('Replace the placeholder with your real server IP first.');
    return;
  }
  try {
    await navigator.clipboard.writeText(ip);
    showToast('Server IP copied to clipboard!');
  } catch {
    showToast('Server IP: ' + ip);
  }
});
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('[data-placeholder-link]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showToast('Add your ' + link.dataset.placeholderLink + ' URL in index.html first.');
  });
});
