// Selecting elements form DOM
const movieSearchBtn = document.querySelector("#movie-search-btn");
const searchInputText=document.querySelector('#movie-search-input');
const movieSearchable = document.querySelector("#movie-searchable");

// API key
const apiKEy= '25f7427acddaad32df99285ff2406c1a';
const url = `https://api.themoviedb.org/3/search/movie?api_key=25f7427acddaad32df99285ff2406c1a`;

function createMovieContainer(movies) {
    movieElement=document.createElement('div');
    movieElement.setAttribute('class','movie');

    function movieSection(movies) {
        movies.map((movie) =>{
            return `
            <img src=${movie.poster_path} data-movie-id=${movie.id} />
            `;
        })
    }

    const movieTemplate =` 
            <section class="section">
            ${movieSection(movies)}
            </section>
             <div class="content">
             <p id="content-close">X</p>
             </div>
            
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement

}

// EventListeners
movieSearchBtn.onclick = function(event) {
    const value = searchInputText.value;
    const newUrl = url + '&query='+value;
    fetch(newUrl)
    .then(res =>res.json())
    .then((data) =>{
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        movieSearchable.appendChild(movieBlock)
        console.log('data' , data);
    })
    .catch((error)=>{
        console.log('Error', error);
    })
    console.log("value :" , value);
}


                  