const covidSearchBtn = document.getElementById("covid-search-btn");
const covidList = document.getElementById("covid");


// EventListeners

covidSearchBtn.addEventListener('click', getcovidList());

// Get covid list 

function getcovidList() {
    let searchInputText=document.getElementById('covid-search-input').value.trim();
    fetch("https://covid-193.p.rapidapi.com/countries", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2056590684msh0a1b876a291685ep1abadajsn659338f4a423",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
        }
    })
    .then(response => {
        console.log(response);
    })
    .then((data)=> {
        manipulateData(data)
    });

}

function manipulateData(data) {
    countries.forEach(country => {
        var country = data.countries[0];
        console.log(country);
    });
}
