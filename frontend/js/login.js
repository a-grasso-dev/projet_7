const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const email = e.target.email.value;
  const password = e.target.password.value;

  axios.post('http://localhost:3000/api/users/login', { email, password }).then((resp) => {
    if (resp.data.status === 'OK') {
      localStorage.setItem('api-token', resp.data.token);
      window.location.href = 'index.html';
    }
  }, (err) => {
    alert("pour accéder veuillez d'abord vous enregistrer");
    window.location.href = 'signup.html'
  });
});
