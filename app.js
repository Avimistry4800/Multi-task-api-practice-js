// Selecting elements form DOM
const movieSearchBtn = document.querySelector("#movie-search-btn");
const searchInputText=document.querySelector('#movie-search-input');
const movieSearchable = document.querySelector("#movie-searchable");

// API key
const apiKEy= '25f7427acddaad32df99285ff2406c1a';
const url = `https://api.themoviedb.org/3/search/movie?api_key=25f7427acddaad32df99285ff2406c1a`;
const imageUrl = 'https://image.tmdb.org/t/p/w500/'

function createMovieContainer(movies) {
    movieElement=document.createElement('div');
    movieElement.setAttribute('class','movie');

    function movieSection(movies) {
        return movies.map((movie) =>{
            if (movie.poster_path) {
                return `<img 
                src=${imageUrl + movie.poster_path} 
                data-movie-id=${movie.id}
             />`;
            }
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
function renderSearchMovies(data){
    movieSearchable.innerHTML='';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock)
    console.log('data' , data);
}

// EventListeners
movieSearchBtn.onclick = function(event) {
    const value = searchInputText.value;
    const newUrl = url + '&query='+value;
    fetch(newUrl)
    .then(res =>res.json())
    .then(renderSearchMovies)
    .catch((error)=>{
        console.log('Error', error);
    })
    searchInputText.value='';
    console.log("value :" , value);
}

// Event Delegation
document.onclick = function (event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        console.log('hi there');
    } 
}
                  