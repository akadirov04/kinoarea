import { Chart, DoughnutController, ArcElement } from "chart.js";


Chart.register(DoughnutController, ArcElement)

import { getData } from "../../modules/http";
import { header } from "../../modules/ui";


header()

let id = localStorage.getItem("movieId");

getData(`/movie/${id}`)
    .then(res => {
        reload(res.data);
        reload(res.data, true);
    })
    .catch(error => console.error(error));

let ctx = document.querySelectorAll("#myChart");

function reload(movie, lowerRating = false) {
    let rating = movie.vote_average;
    if (lowerRating) {
        rating -= 0.5;
    }

    let chart = new Chart(ctx[lowerRating ? 1 : 0], {
        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Movie Ratings",
              data: [rating, 10 - rating],
              backgroundColor: ["rgb(75, 203, 54)", "rgba(75, 203, 54, 0.3)"],
              borderColor: ["rgb(75, 203, 54, 1)", "rgba(75, 203, 54, 0.3)"],
            },
          ],
        },
        options: {
          responsive: false,
        },
    });
}

document.querySelector('.watchtrailer').addEventListener('click', function (e) {
    e.preventDefault();

    const sectionId = this.querySelector('a').getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth'
    });

    const video = document.querySelector(sectionId + ' .trailervideo1');
    video.addEventListener('canplay', function() {
        video.play();
    });
});


getData(`/movie/${id}`)
    .then(res => {
        filmname.textContent = res.data.title;
        fi.textContent = res.data.title
        bth1.textContent = res.data.title
        filmEn.textContent = res.data.original_title;
        desc.textContent = res.data.overview;
        movieImage.src = "https://image.tmdb.org/t/p/original/" + res.data.poster_path;
        genre.textContent = res.data.genres[0].name + ", " + res.data.genres[1].name
        country.textContent = res.data.production_countries[0].name
        smname.textContent = res.data.title
        let de = Math.ceil(res.data.vote_average * 10)
        per.textContent = "Режим ожиданий " + de + "%";
        persent.style.maxWidth = de * 2 + "px"
        if (de >= 0 && de <= 25) {
            persent.style.backgroundColor = "red";
        } else if (de > 25 && de <= 50) {
            persent.style.backgroundColor = "orange";
        } else if (de > 50 && de <= 75) {
            persent.style.backgroundColor = "yellow";
        } else {
            persent.style.backgroundColor = "green";
        }
        year.textContent = res.data.release_date.slice(0, 4)
        revenue.textContent = res.data.revenue + " $"
        console.log(res.data);
        releasedates.forEach(releasedate => {
            releasedate.textContent = res.data.release_date;
        });
        time.textContent = res.data.runtime + " мин. / " + Math.floor(res.data.runtime / 60) + ":" + res.data.runtime % 60
    })
    .catch(error => console.error(error))
    
let persent = document.querySelector(".persent")
let per = document.querySelector(".per")
let movieImage = document.getElementById("movieImage");
let filmname = document.querySelector(".filmname")
let bth1 = document.querySelector(".bt h1")
let filmEn = document.querySelector(".filmEn")
let fi = document.querySelector(".fi")
let year = document.querySelector(".year")
let desc = document.querySelector(".desc")
let country = document.querySelector(".country")
let genre = document.querySelector(".genre")
let releasedates = document.querySelectorAll(".release-date")
let revenue = document.querySelector(".revenue")
let time = document.querySelector(".time")
let smname = document.getElementById("smallname")

getData(`/movie/${id}/videos`)
.then(res => {
let video = document.querySelector(".trailervideo1")
let youtubeUrl = "https://youtube.com/embed/"
video.setAttribute("src", youtubeUrl + res.data.results[0].key)
})
.catch(error => console.error(error))

getData(`/movie/${id}/credits`)
.then(res => reloadActors(res.data.cast.slice(0, 10)))
.catch(error => console.error(error))

function reloadActors(arr) {
    let contactContainer = document.querySelector('.contact');
    for (let item of arr) {
        let actorItem = document.createElement('div');
            actorItem.classList.add('actoritem');
            let img = document.createElement('img');
            img.setAttribute("src", `https://image.tmdb.org/t/p/original${item.profile_path}` )
            let h1 = document.createElement('h1');
            h1.classList.add('n');
            h1.textContent = item.name;
        
            let h2 = document.createElement('h2');
            h2.classList.add('orn');
            h2.textContent = item.original_name;
        
            let p = document.createElement('p');
            p.classList.add('pers');
            p.textContent = item.character;
        
            actorItem.appendChild(img);
            actorItem.appendChild(h1);
            actorItem.appendChild(h2);
            actorItem.appendChild(p);
        
            contactContainer.appendChild(actorItem);
            actorItem.onclick = () => {
                localStorage.setItem("personId", item.id)
                window.location.pathname = "/pages/person/"
            }
        }
    }

getData(`/movie/${id}/images?include_image_language=en`)
    .then(res => reloadImages(res.data.posters.slice(0, 6)))
    .catch(error => console.error(error))
let imgContainer = document.querySelector('.img-box');

function reloadImages(arr) {
    for (let item of arr) {
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', `https://image.tmdb.org/t/p/original${item.file_path}`);
        let itemimgDiv = document.createElement('div');
        itemimgDiv.classList.add('itemimg');
        itemimgDiv.appendChild(imgElement);
        imgContainer.appendChild(itemimgDiv);
    }
};

function createMovieItem(item) {
    const movieItem = document.createElement('div');
    movieItem.classList.add('item');

    const movieImage = document.createElement('div');
    movieImage.classList.add('movie-img');
    const img = document.createElement('img');
    img.setAttribute('src', `https://image.tmdb.org/t/p/original${item.poster_path}`);
    movieImage.appendChild(img);

    const rating = document.createElement('div');
    rating.classList.add('rating');
    rating.textContent = item.vote_average.toFixed(1);
    movieImage.appendChild(rating);

    const movieName = document.createElement('div');
    movieName.classList.add('movie-name');
    const title = document.createElement('h6');
    title.textContent = item.title;
    const genre = document.createElement('p');
    // genre.textContent = movie.genre;

    movieName.appendChild(title);
    movieName.appendChild(genre);

    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieName);

    movieItem.onclick = () => {
        localStorage.setItem("movieId", item.id)
        window.location.pathname = "/pages/movie/"
      }

    return movieItem;
}

function updateSlideIndicator(currentIndex, totalSlides, indicatorSelector) {
    const slideIndicator = document.querySelector(indicatorSelector);
    if (currentIndex >= totalSlides * 4) {
        slideIndicator.textContent = `${totalSlides}/${totalSlides}`;
    } else {
        slideIndicator.textContent = `${currentIndex / 4 + 1}/${totalSlides}`;
    }
}

function addArrowClickListeners(leftArrowSelector, rightArrowSelector, currentIndex, data, updateFunction) {
    const leftArrow = document.querySelector(leftArrowSelector);
    const rightArrow = document.querySelector(rightArrowSelector);

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 4;
            updateFunction(data, currentIndex);
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex + 4 < data.length) {
            currentIndex += 4;
            updateFunction(data, currentIndex);
        }
    });
}

function updateMoviesGrid(gridSelector, data, currentIndex) {
    const grid = document.querySelector(gridSelector);
    grid.innerHTML = '';
    const endIndex = Math.min(currentIndex + 4, data.length);
    for (let i = currentIndex; i < endIndex; i++) {
        const item = data[i];
        const movieItem = createMovieItem(item);
        grid.appendChild(movieItem);
    }
}

getData(`/movie/${id}/similar`)
    .then(res => {
        const similarData = res.data.results.slice(0, 8);
        const totalSimilarSlides = Math.ceil(similarData.length / 4);
        let currentSimilarIndex = 0;
        updateMoviesGrid('.grid', similarData, currentSimilarIndex);
        addArrowClickListeners('.left-arrow', '.right-arrow', currentSimilarIndex, similarData, (data, index) => {
            currentSimilarIndex = index;
            updateMoviesGrid('.grid', data, currentSimilarIndex);
            updateSlideIndicator(currentSimilarIndex, totalSimilarSlides, '.slip p');
        });
        updateSlideIndicator(currentSimilarIndex, totalSimilarSlides, '.slip p');
    })
    .catch(error => console.error(error));

getData(`/movie/${id}/recommendations`)
    .then(res => {
        const recommendationData = res.data.results.slice(0, 8);
        const totalRecommendationSlides = Math.ceil(recommendationData.length / 4);
        let currentRecommendationIndex = 0;
        updateMoviesGrid('.grid1', recommendationData, currentRecommendationIndex);
        addArrowClickListeners('.left-arrow1', '.right-arrow1', currentRecommendationIndex, recommendationData, (data, index) => {
            currentRecommendationIndex = index;
            updateMoviesGrid('.grid1', data, currentRecommendationIndex);
            updateSlideIndicator(currentRecommendationIndex, totalRecommendationSlides, '.sli p');
        });
        updateSlideIndicator(currentRecommendationIndex, totalRecommendationSlides, '.sli p');
    })
    .catch(error => console.error(error));
