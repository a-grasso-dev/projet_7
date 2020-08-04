const messageForm = document.querySelector('#message-form');

const headers = {
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("api-token"),
        'Content-Type': 'multipart/form-data'
    }
};

if (localStorage.getItem("api-token")) {
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('title', e.target.title.value);
        bodyFormData.append('content', e.target.post.value);
        bodyFormData.append('image', e.target.media.files[0]);

        axios.post('http://localhost:3000/api/messages/new', bodyFormData, headers)
            .then((resp) => {
                window.location.href = 'index.html'
            })
    });
} else { // si l'utilisateur n'est pas connecté il est renvoyé vers login.html
    window.location.href = 'login.html'
}







