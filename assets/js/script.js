const row = document.querySelector('.row')
const search = document.querySelector('.search__icon')
const sInput = document.querySelector('.search-input')
const modal = document.querySelector('.modal')
let inputValue = '';

sInput.addEventListener('input', (e) => {
    inputValue = e.target.value;
});

search.addEventListener('click', () => {
    row.style.display = 'flex';

    fetch('https://www.omdbapi.com/?apikey=dca61bcc&s=' + inputValue)
        .then(response => response.json())
        .then(result => {
            const movies = result.Search;
            let cards = '';

            movies.forEach(movie => {
                fetch('https://www.omdbapi.com/?apikey=dca61bcc&i=' + movie.imdbID)
                    .then(response => response.json())
                    .then(movieDetail => {
                        cards += showCards(movieDetail);
                        row.innerHTML = cards;
                    })
                    .catch(() => {
                        row.innerHTML = `<p>404 Not Found</p>`
                    });
            });

            row.addEventListener('click', (e) => {
                if (e.target.className == 'details') {
                    const imdbID = e.target.dataset.imdbid;
                    fetch('https://www.omdbapi.com/?apikey=dca61bcc&i=' + imdbID)
                        .then(response => response.json())
                        .then(movieDetail => {
                            modal.innerHTML = modalDetails(movieDetail);
                            modal.classList.add('show');
                            document.body.classList.add('modal-open');

                            const modalClose = document.querySelector('.modal-close')
                            const buttonClose = document.querySelector('.button-close')

                            modalClose.addEventListener('click', () => {
                                modal.classList.remove('show')
                                modal.classList.add('hidden')
                                document.body.classList.remove('modal-open')
                            });

                            buttonClose.addEventListener('click', () => {
                                modal.classList.remove('show')
                                modal.classList.add('hidden')
                                document.body.classList.remove('modal-open')
                            });
                        })
                        .catch(() => {
                            modal.innerHTML = `<p>404 Not Found</p>`;
                        });
                }
            });
        })
        .catch(() => {
            row.innerHTML = `<p>Lu ngetik Apaan Bjir</p>`
        });
});

function showCards(movie) {
    return `<div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <div class="duration">${movie.Runtime}</div>
                        <div class="card-row">
                            <div class="genre">${movie.Genre}</div>
                        </div>
                        <a href="#ModalDetailMovie" class="details" data-target="#ModalDetailMovie" data-imdbid="${movie.imdbID}">Show Details</a>
                    </div>
                </div>`;
};

function modalDetails(m) {
    return ` <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-close">
                            <button class="button"><i class="fa-solid fa-x close-icon"></i></button>
                        </div>
                    </div>
                    <div class="modal-row">
                        <div class="modal-image">
                            <img src="${m.Poster}" alt="">
                        </div>
                        <div class="modal-body">
                            <p><span>${m.Title} | ${m.Year}</span></p>
                            <p><span>DIRECTOR : </span>${m.Director}</p>
                            <p><span>ACTORS : </span>${m.Actors}</p>
                            <p><span>WRITER : </span>${m.Writer}</p>
                            <p><span>PLOT : </span>${m.Plot} </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="button-close">Close</button>
                    </div>
                </div>`;
}
