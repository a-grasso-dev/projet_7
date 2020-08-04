const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};

const getMessages = () => axios.get("http://localhost:3000/api/messages", headers).then((data) => {
    listMessages(data.data); //appel de la fonction d'affichage des messages
}, (err) => {
    window.location.href = 'login.html'
});

moment.locale('fr')

//declaration de la fonction d'affichage des messages
const listMessages = (messages) => {
    for (let i in messages) {

        let nbLikes = messages[i].likes;

        // creation de la div principale
        const div = document.createElement('div')
        div.className = "post"; // ajout de la class
        const parent = document.getElementById("listMessages"); // ou je vais appliquer la div
        parent.appendChild(div); // ajout de div dans l'element parent

        /**
         * post header
         */
        const postHeader = document.createElement('div');
        postHeader.className = 'post-header'
        div.appendChild(postHeader);

        // user
        const spanAuthor = document.createElement('span');
        spanAuthor.className = 'author';
        postHeader.appendChild(spanAuthor);
        spanAuthor.innerHTML = messages[i].User.firstName + ' ' + messages[i].User.lastName + ' - ' + moment(messages[i].createdAt).format('LLL');

        /**
         * post main
         */
        const postMain = document.createElement('div');
        postMain.className = 'post-main'
        div.appendChild(postMain);

        // titre 
        const h1 = document.createElement('h1');
        h1.className = 'title-post';
        postMain.appendChild(h1);
        h1.innerHTML = messages[i].title;

        // message
        const p = document.createElement("p"); //creation d' un paragraphe
        p.className = 'pPost'
        postMain.appendChild(p);
        p.innerHTML = messages[i].content; // ajout du message dans p

        // images
        if (messages[i].attachment) {
            const imgAttachment = document.createElement('img');
            imgAttachment.className = 'img-post';
            imgAttachment.width = 75;
            imgAttachment.src = 'http://localhost:3000/uploads/' + messages[i].attachment;
            postMain.appendChild(imgAttachment);
        }

        /**
         * post footer
         */
        const postFooter = document.createElement('div');
        postFooter.className = 'post-footer'
        div.appendChild(postFooter);


        // div pour btn modifier et effacer
        const divBtnModifiable = document.createElement('div');
        divBtnModifiable.className = 'content-modify';
        postFooter.appendChild(divBtnModifiable);

        // modifier
        if (messages[i].modifiable) {
            const modifyBtn = document.createElement('button')
            divBtnModifiable.appendChild(modifyBtn);
            modifyBtn.className = 'modify-post'
            const modifiableLink = document.createElement('a')
            modifiableLink.className = 'link-modify-post'
            modifiableLink.href = `onepost.html?id=${messages[i].id}`
            modifiableLink.innerHTML = 'Modifier'
            modifyBtn.appendChild(modifiableLink)
        }

        // effacer
        if (messages[i].modifiable) {
            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'delete-post'
            deleteBtn.innerHTML = 'Effacer'
            divBtnModifiable.appendChild(deleteBtn)

            deleteBtn.addEventListener('click', () => {
                axios.delete(`http://localhost:3000/api/messages/delete/${messages[i].id}`, headers)
                    .then((resp) => {
                        parent.innerHTML = ''
                        getMessages()
                    })
            })
        }
        // like et dislike
        const divLikesDislike = document.createElement('div');
        divLikesDislike.className = 'content-likes';
        postFooter.appendChild(divLikesDislike);

        // lien pour like
        const divLikes = document.createElement('div');
        divLikes.className = 'div-likes';
        divLikesDislike.appendChild(divLikes);

        const btnLikes = document.createElement('button');
        btnLikes.className = 'btn-likes';
        divLikes.appendChild(btnLikes);

        const imgLikes = document.createElement('img');
        imgLikes.className = "likes-icon";
        imgLikes.src = "https://img.icons8.com/dusk/64/000000/thumb-up.png";
        btnLikes.appendChild(imgLikes);

        // nombres likes
        const spanLikes = document.createElement('span');
        spanLikes.className = 'span-likes'
        divLikes.appendChild(spanLikes);
        spanLikes.innerHTML = nbLikes + " J'aime";

        let likeOrDislike = messages[i].liked ? 'dislike' : 'like'

        btnLikes.addEventListener('click', () => {
            axios.post(`http://localhost:3000/api/messages/${messages[i].id}/vote/${likeOrDislike}`, {}, headers).then((resp) => {
                if (likeOrDislike === 'like')
                    nbLikes += 1
                else
                    nbLikes -= 1
                spanLikes.innerHTML = nbLikes + " J'aime";
                likeOrDislike = likeOrDislike === 'like' ? 'dislike' : 'like'
            })
        })
    }
};
getMessages()
