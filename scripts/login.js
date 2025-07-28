document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('login-error');

  errorMsg.classList.add('hidden'); // Oculta mensagem de erro anterior

  if (!username || !password) {
    errorMsg.textContent = 'Por favor, preencha todos os campos.';
    errorMsg.classList.remove('hidden');
    return;
  }

  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('tokenCreatedAt', Date.now());
      window.location.href = './posts.html';
    } else {
      throw new Error(data.message || 'Erro ao fazer login.');
    }
  } catch (err) {
    errorMsg.textContent = 'Erro: ' + err.message;
    errorMsg.classList.remove('hidden');
  }
});