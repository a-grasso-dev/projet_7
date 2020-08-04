const form = document.querySelector('#modify-form');

const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};


axios.get("http://localhost:3000/api/users/me/", headers)
    .then((data) => {

        const lastName = document.querySelector('#lastName');
        const firstName = document.querySelector('#firstName');
        const email = document.querySelector('#email');

        lastName.value = data.data.lastName;
        firstName.value = data.data.firstName;
        email.value = data.data.email;
    }, (err) => {
        window.location.href = 'login.html'
    });

// pour la modification d'un post
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const lastName = e.target.lastName.value;
    const firstName = e.target.firstName.value;
    const email = e.target.email.value;

    const data = {
        lastName,
        firstName,
        email
    }

    axios.put("http://localhost:3000/api/users/me/", data, headers).then(() => {
        alert('Profil modifié')
    })

})

const deleteAccount = document.querySelector('.delete-account')
deleteAccount.addEventListener('click', () => {
    axios.delete("http://localhost:3000/api/users/me/", headers).then(() => {
        window.location.href = 'login.html'
    })
})
