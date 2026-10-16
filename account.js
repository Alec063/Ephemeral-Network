(() => {
  const $ = id => document.getElementById(id);
  const url = window.EPHEMERAL_SUPABASE_URL;
  const key = window.EPHEMERAL_SUPABASE_PUBLISHABLE_KEY;
  const ready = typeof url === 'string' && /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url) && typeof key === 'string' && !key.startsWith('PASTE_') && !!window.supabase;
  const client = ready ? window.supabase.createClient(url, key) : null;
  $('setupNotice').hidden = !!client;
  let mode = 'login';
  let recovery = false;
  const message = text => { $('authMessage').textContent = text; };
  function switchMode(next) {
    mode = next;
    $('tabLogin').classList.toggle('selected', mode === 'login');
    $('tabSignup').classList.toggle('selected', mode === 'signup');
    $('authSubmit').textContent = mode === 'login' ? 'Sign in' : 'Create account';
    $('password').autocomplete = mode === 'login' ? 'current-password' : 'new-password';
    $('resetPassword').hidden = mode !== 'login';
    message('');
  }
  $('tabLogin').addEventListener('click', () => switchMode('login'));
  $('tabSignup').addEventListener('click', () => switchMode('signup'));
  const callbackUrl = new URL('account.html', window.location.href).href;
  function render(user) {
    $('guestPanel').hidden = !!user || recovery;
    $('userPanel').hidden = !user || recovery;
    $('resetPanel').hidden = !recovery;
    if (user) $('userEmail').textContent = 'Signed in as ' + (user.email || 'player');
  }
  $('authForm').addEventListener('submit', async e => {
    e.preventDefault();
    if (!client) return message('Ask the website owner to configure Supabase first.');
    const email = $('email').value.trim();
    const password = $('password').value;
    $('authSubmit').disabled = true;
    message('Please wait…');
    try {
      const result = mode === 'signup'
        ? await client.auth.signUp({email, password, options: {emailRedirectTo: callbackUrl}})
        : await client.auth.signInWithPassword({email, password});
      if (result.error) throw result.error;
      message(mode === 'signup' ? 'Registration submitted. Check your email for a confirmation link (if confirmation is enabled).' : 'Signed in successfully.');
      if (mode === 'signup') $('password').value = '';
    } catch (err) { message(err.message || 'Authentication failed.'); }
    finally { $('authSubmit').disabled = false; }
  });
  $('resetPassword').addEventListener('click', async () => {
    if (!client) return message('Supabase is not configured.');
    const email = $('email').value.trim();
    if (!email) return message('Enter your email address first, then click Forgot password.');
    const {error} = await client.auth.resetPasswordForEmail(email, {redirectTo: callbackUrl});
    message(error ? error.message : 'If the account exists, a password reset email has been sent.');
  });
  $('updatePasswordForm').addEventListener('submit', async e => {
    e.preventDefault();
    if (!client) return;
    const {error} = await client.auth.updateUser({password: $('newPassword').value});
    if (error) return message(error.message);
    recovery = false;
    $('newPassword').value = '';
    const {data} = await client.auth.getUser();
    render(data.user);
    message('Password updated.');
  });
  $('signOut').addEventListener('click', async () => {
    if (!client) return;
    const {error} = await client.auth.signOut();
    message(error ? error.message : 'Signed out.');
  });
  if (client) {
    client.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') recovery = true;
      if (event === 'SIGNED_OUT') recovery = false;
      render(session?.user ?? null);
    });
    client.auth.getUser().then(({data}) => render(data.user)).catch(() => render(null));
  } else render(null);
})();