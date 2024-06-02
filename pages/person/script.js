import { getData } from "../../modules/http";
import { header } from "../../modules/ui";

header()

let id = localStorage.getItem("personId");

document.addEventListener('DOMContentLoaded', function () {
  const biographyHeader = document.querySelector('.biogr');
  const biographyContent = document.querySelector('.biography');

  const infoHeader = document.querySelector('.inf');
  const infoContent = document.querySelectorAll('.activedetails');

  biographyHeader.addEventListener('click', function () {
      biographyContent.style.display = 'block';
      biographyHeader.style.color = "rgb(255, 255, 255)"
      infoHeader.style.color = "rgb(109, 113, 125)"
      infoContent.forEach(element => {
          element.style.display = 'none';
      });
  });

  infoHeader.addEventListener('click', function () {
      biographyContent.style.display = 'none';
      biographyHeader.style.color = "rgb(109, 113, 125)"
      infoHeader.style.color = "rgb(255, 255, 255)"
      infoContent.forEach(element => {
          element.style.display = 'block';
      });
  });
});


getData(`/person/${id}?language=ru-RU`)
  .then(res => {
    console.log(res.data)
    white.textContent = res.data.name;
    filmname.textContent = res.data.name;
    fi.textContent = res.data.name
    movieImage.src = "https://image.tmdb.org/t/p/original/" + res.data.profile_path;
    mainact.textContent = res.data.known_for_department
    filmEn.textContent = res.data.name
    born.textContent = res.data.birthday
    text.textContent = res.data.biography
    whereborn.textContent = res.data.place_of_birth
  })
  .catch(error => console.error(error))

let white = document.querySelector(".white")
let movieImage = document.getElementById("movieImage");
let filmname = document.querySelector(".filmname")
let filmEn = document.querySelector(".filmEn")
let mainact = document.querySelector(".mainact")
let born = document.querySelector(".born")
let text = document.querySelector(".text")
let whereborn = document.querySelector(".whereborn")
let allfilms = document.querySelector(".allfilms")
let fi = document.querySelector(".fi")

getData(`/person/${id}/movie_credits`)
  .then(res => {
    allfilms.textContent = res.data.cast.length + ", 2007-2024"
    console.log(res.data.cast);
  })
  .catch(error => console.error(error))

let currentIndex = 0;
let totalSlides = 5;

function updateSlideIndicator() {
  const slideIndicator = document.querySelector('.slid p');
  slideIndicator.textContent = `${currentIndex / 4 + 1}/${totalSlides}`;
}

function reloadNew(arr) {
    let flex = document.querySelector(".grid-new");
    flex.innerHTML = '';
    for (let i = currentIndex; i < currentIndex + 4; i++) {
      if (arr[i]) {
        let item = arr[i];
        let itemNew = document.createElement("div");
        itemNew.classList.add("item-new");
  
        let newimg = document.createElement("div");
        newimg.classList.add("newimg");
  
        let img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/original/" + item.poster_path;
  
        let rating = document.createElement('div');
        rating.classList.add('rating');
        rating.textContent = item.vote_average.toFixed(1);
  
        let movieName = document.createElement("div");
        movieName.classList.add("movie-name");
  
        let title = document.createElement("h6");
        title.textContent = item.title;
  
        // let genre = document.createElement("p");
        // genre.textContent = item.genre;
  
        newimg.appendChild(img);
        newimg.appendChild(rating);
  
        movieName.appendChild(title);
        // movieName.appendChild(genre);
  
        itemNew.appendChild(newimg);
        itemNew.appendChild(movieName);
  
        flex.appendChild(itemNew);
        itemNew.onclick = () => {
          localStorage.setItem("movieId", item.id)
          window.location.pathname = "/pages/movie/"
        }
      }
    }
    updateSlideIndicator();
  }
  

getData(`/person/${id}/movie_credits`)
  .then(res => {
    reloadNew(res.data.cast.slice(0, 20));
    addArrowClickListeners(res.data.cast.slice(0, 20));
  })
  .catch(error => console.error(error));

function addArrowClickListeners(data) {
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 4;
      reloadNew(data);
    }
  });

  rightArrow.addEventListener('click', () => {
    if (currentIndex + 4 < data.length) {
      currentIndex += 4;
      reloadNew(data);
    }
  });
}

getData(`/person/${id}/images`)
    .then(res => reloadPics(res.data.profiles.slice(0, 6)))
    .catch(error => console.error(error))
let imgContainer = document.querySelector('.picsac');

function reloadPics(arr) {
    for (let item of arr) {
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', `https://image.tmdb.org/t/p/original${item.file_path}`);
        let itemimgDiv = document.createElement('div');
        itemimgDiv.classList.add('profileimg');
        itemimgDiv.appendChild(imgElement);
        imgContainer.appendChild(itemimgDiv);
    }
};