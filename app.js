// Selecting elements form DOM
const movieSearchBtn = document.querySelector("#movie-search-btn");
const searchInputText=document.querySelector('#movie-search-input');
const movieSearchable = document.querySelector("#movie-searchable");
const movieContainer = document.querySelector("#movie-container");



function createMovieContainer(movies, title='') { 
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
            <h2>${title}</h2>
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

function renderMovies(data){
    const movies = data.results;
    const movieBlock = createMovieContainer(movies,this.title);
    movieContainer.appendChild(movieBlock);
}

function handleError(error) {
    console.log('Error :',error)
}

// EventListeners
movieSearchBtn.onclick = function(event) {
    const value = searchInputText.value;
    const path = '/search/movie';
    const newUrl = generateurl(path) + '&query='+ value;

    fetch(newUrl)
    .then(res =>res.json())
    .then(renderSearchMovies)
    .catch((error)=>{
        console.log('Error', error);
    })

    searchInputText.value='';
    console.log("value :" , value);
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height= 300;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data, content) {
    
        //Display movie videos
        content.innerHTML = '<p id = "content-close">X</p>';
        console.log('Videos :', data);
        const videos = data.results;
        const length = videos.length > 4 ? 4 : videos.length; //if the length og videos array is more than 4 it will get first 5 item & if it is less than 5 it will run the loop into it :p
        const iframeContainer = document.createElement('div');


        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];
            iframe = createIframe(video);
            iframeContainer.appendChild(iframe);
            content.appendChild(iframeContainer);
        }
}

// Event Delegation
document.onclick = function (event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        console.log('hi there');
        console.log('Event :', event);
        const movieId = target.dataset.movieId;
        console.log('movieId :',movieId);
        const section = event.target.parentElement; //section
        const content = section.nextElementSibling; //content
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`
        const url = generateurl(path);

        // fetch movie videos (trailer/behind the scene)
        fetch(url)
        .then(res =>res.json())
        .then((data) => createVideoTemplate(data, content))
    .catch((error)=>{
        console.log('Error', error);
    })
    } 
    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}
getUpcomingMovies();
getTopRatedMovies();
getPopulerMovies();
                  