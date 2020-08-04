const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const firstName = e.target.first_name.value
    const lastName = e.target.last_name.value

    axios.post('http://localhost:3000/api/users/register', { email, password, firstName, lastName }).then((resp) => {
        localStorage.setItem('api-token', resp.data.token)
        if (resp.data.status === 'OK') {
            window.location.href = 'index.html'
        }
    }, (err) => {
        alert("vous êtes déjà enregistré! Veuillez entrée avec votre email et votre mot de passe");
        window.location.href = 'login.html'
    });
});
