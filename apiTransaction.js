// Initial values
const apiKEy= '25f7427acddaad32df99285ff2406c1a';
const url = `https://api.themoviedb.org/3/search/movie?api_key=25f7427acddaad32df99285ff2406c1a`;
const imageUrl = 'https://image.tmdb.org/t/p/w500/'

function generateurl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=25f7427acddaad32df99285ff2406c1a`;
    return url;
}

function requestMovies(url , onConpleate, onError) {
    fetch(url)
    .then(res =>res.json())
    .then(onConpleate)
    .catch(onError);
}


function searchmovie(value) {
    const path = '/search/movie';
    const url = generateurl(path) + '&query='+ value;

    requestMovies(url,renderSearchMovies,handleError);
}

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateurl(path);
    const render = renderMovies.bind({ title: 'Upcoming Movies'});
    requestMovies(url,render,handleError);
}

function getPopulerMovies() {
    const path = '/movie/popular';
    const url = generateurl(path);
    const render = renderMovies.bind({ title: 'Populer Movies'});
    requestMovies(url,render,handleError);
}


function getTopRatedMovies() {
    const path = '/movie/top_rated';
    const url = generateurl(path);
    const render = renderMovies.bind({ title: 'Top Rated Movies'});
    requestMovies(url,render,handleError);
}