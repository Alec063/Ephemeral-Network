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

// Public Java Edition server status, refreshed every 60 seconds.
// Status is informational: an API error does not mean the server is offline.
const SERVER_HOST = 'ephemeral.kinetic.host';
async function updateServerStatus() {
  const status = document.getElementById('networkStatus');
  const details = document.getElementById('serverStatusText');
  const players = document.getElementById('serverPlayerCount');
  try {
    const response = await fetch('https://api.mcstatus.io/v2/status/java/' + encodeURIComponent(SERVER_HOST), { cache: 'no-store' });
    if (!response.ok) throw new Error('Status request failed');
    const data = await response.json();
    if (data.online === true) {
      status.textContent = 'ONLINE';
      details.textContent = '● Server online';
      players.textContent = `Players: ${data.players?.online ?? '—'} / ${data.players?.max ?? '—'}`;
    } else if (data.online === false) {
      status.textContent = 'OFFLINE';
      details.textContent = '○ Server offline';
      players.textContent = 'Players: — / —';
    } else {
      throw new Error('Unexpected status response');
    }
  } catch (error) {
    status.textContent = 'UNKNOWN';
    details.textContent = 'Status temporarily unavailable';
    players.textContent = 'Players: — / —';
  }
}
updateServerStatus();
setInterval(updateServerStatus, 60000);
