function getCards() {
    let container = document.querySelector(`.cards`);

    for (let i = 0; i < 6; i++)
    container.innerHTML += `
    <div class="card" style="width: 20rem">
        <a href="album.html?i=${i}" class="text-decoration-none text-reset">
            <img
                src="${album[i].img}"
                class="card-img-top"
            />
            <div class="card-body">
            <hr>
            <h5 class="card-title text-center">${album[i].title}</h5>
            <hr>
            </div>
        </a>
    </div>`;
}
getCards();