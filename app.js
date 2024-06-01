let input = document.getElementById("input");
let button = document.getElementById("btn");
let modal = document.querySelector(".modal-overlay");
let closeBtn = document.querySelector(".close-btn");

let titleElement = document.getElementById("title");
let posterElement = document.getElementById("poster");
let directorElement = document.getElementById("director");
let writerElement = document.getElementById("writer");
let ratingElement = document.getElementById("rating");
let releaseDateElement = document.getElementById("release-date");
let descriptionElement = document.getElementById("description");

let key = `3d89e4b4`;

button.addEventListener("click", () => {
    let url = `http://www.omdbapi.com/?t=${input.value}&apikey=${key}`; // api key
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.Response === "True") {
            titleElement.textContent = data.Title;
            posterElement.src = data.Poster !== "N/A" ? data.Poster : "";
            directorElement.textContent = `Director: ${data.Director}`;
            writerElement.textContent = `Writer: ${data.Writer}`;
            ratingElement.textContent = `Rating: ${data.imdbRating}`;
            releaseDateElement.textContent = `Release Date: ${data.Released}`;
            descriptionElement.textContent = data.Plot;
        } else {
            titleElement.textContent = "Movie not found.";
            posterElement.src = "";
            directorElement.textContent = "";
            writerElement.textContent = "";
            ratingElement.textContent = "";
            releaseDateElement.textContent = "";
            descriptionElement.textContent = "";
        }
    })
    .catch(error => {
        console.log('There has been a problem with your fetch operation:', error);
        titleElement.textContent = "Error fetching movie data.";
        posterElement.src = "";
        directorElement.textContent = "";
        writerElement.textContent = "";
        ratingElement.textContent = "";
        releaseDateElement.textContent = "";
        descriptionElement.textContent = "";
    });

    modal.classList.add("open-modal");
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove("open-modal");
    }
});

closeBtn.addEventListener('click', function() {
    modal.classList.remove("open-modal");
});
