// auth.js

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { getData } from "./modules/http";
import { reloadMovies } from "./modules/ui";
import { header } from "./modules/ui";

onAuthStateChanged(auth, (user) => {
  if(user) {
      let name = document.querySelector(".username")
      name.textContent = user.displayName
      let signin = document.querySelector(".signin")
      signin.style.display = "none"
      let av = document.querySelector(".avatar")
      av.style.display = "block"
      console.log(user);
    } else {
      window.location.replace("/pages/signin/")
    }
  });

// let user = localStorage.getItem("userId", user.uid)

header()
let box = document.querySelector(".grid")
getData("movie/now_playing",)
  .then(res => reloadMovies(res.data.results.slice(0, 8), box))
  .catch(error => console.error(error))

getData("/genre/movie/list")
  .then(res => reloadTabs(res.data.genres.slice(0, 7)))
  .catch(error => console.error(error))

let tags = document.querySelector(".tags")

function reloadTabs(tabs) {
  for (let tab of tabs) {
    let p = document.createElement("p");
    p.textContent = tab.name;
    p.classList.add("genre");
    tags.append(p);

    p.onclick = () => {
      document.querySelectorAll('.genre.clicked').forEach(item => {
        item.classList.remove('clicked');
      });
      p.classList.add('clicked');

      getData("/discover/movie?with_genres=" + tab.id)
        .then(res => {
          if (showMore) {
            reloadMovies(res.data.results.slice(0, 20), box);
          } else {
            reloadMovies(res.data.results.slice(0, 8), box);
          }
        })
        .catch(error => console.error(error));
    };

  }
}

let logo = document.querySelector(".logo")

logo.onclick = () => {
  window.location.replace("/")
}

let addBtn = document.querySelector(".add");
let showMore = false;

addBtn.addEventListener("click", function () {
  showMore = !showMore;
  if (showMore) {
    getData("movie/now_playing")
      .then(res => reloadMovies(res.data.results.slice(0, 20), box))
      .catch(error => console.error(error));
    addBtn.textContent = "Скрыть";
  } else {
    getData("movie/now_playing")
      .then(res => reloadMovies(res.data.results.slice(0, 8), box))
      .catch(error => console.error(error));
    addBtn.textContent = "Все новинки";
  }
});

getData("/movie/upcoming")
  .then((res) => reloadTrailers(res.data.results.slice(0, 8)))
  .catch(error => console.error(error))

function reloadTrailers(arr) {
  let trailerBox = document.querySelector(".grid-tr")
  let video = document.querySelector(".trailervideo")
  let movieTitle = document.querySelector(".bt h1");

  for (let item of arr) {

    let trailer = document.createElement("div")
    let image = document.createElement("img")
    trailer.classList.add("item1")
    trailer.append(image)

    image.setAttribute("src", "https://image.tmdb.org/t/p/original/" + item.backdrop_path)
    trailerBox.append(trailer)

    image.onclick = () => {
      getData(`/movie/${item.id}/videos`)
        .then(res => {
          let youtubeUrl = "https://youtube.com/embed/"
          video.setAttribute("src", youtubeUrl + res.data.results[0].key)
          movieTitle.textContent = item.title; // 
        })
        .catch(error => console.error(error))
    }
  }
}

let search = document.querySelector(".search")
let btns_category = document.querySelectorAll(".category")

btns_category.forEach(btn => {
  btn.onclick = () => {
    for (let elem of btns_category) {
      elem.classList.remove("active")
    }
    btn.classList.add("active")
    search.value = '';
    const searchResultsContainer = document.querySelector('.search_results');
    searchResultsContainer.innerHTML = '';
    searcher(btn.id)
  }
})
function searcher(category = "movie") {
  console.log(category);
  search.onkeyup = debounce(
    () => {
      console.log(search.value);
      const searchResultsContainer = document.querySelector('.search_results');
      getData(`search/${category}?query=${search.value}`)
        .then((res) => reloadSearcher(res.data.results, category))
        .catch((error) => console.error(error))
    }
  )
}

function reloadSearcher(arr, category) {
  console.log(arr);
  const searchResultsContainer = document.querySelector('.search_results');
  searchResultsContainer.innerHTML = '';
  for (let item of arr) {
    const newItem = document.createElement('div');
    newItem.classList.add('search_results-item');

    const img = document.createElement('img');
    img.classList.add('search_results-img');
    img.src = item.poster_path ? "https://image.tmdb.org/t/p/original" + item.poster_path : "https://image.tmdb.org/t/p/original" + item.profile_path

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('search_results-info');

    const title = document.createElement('h2');
    title.classList.add('search_results-title');
    title.textContent = category == 'movie' ? item.title : item.name

    console.log(title);

    const date = document.createElement('div');
    date.classList.add('.search_results-date');
    date.textContent = item.release_date ? item.release_date : null;

    const rate = document.createElement('span');
    rate.classList.add('search_results-rate');
    rate.textContent = item.vote_average ? item.vote_average.toFixed(1) : null;

    infoDiv.appendChild(title);
    infoDiv.appendChild(date);
    newItem.appendChild(img);
    newItem.appendChild(infoDiv);
    newItem.appendChild(rate);
    newItem.onclick = () => {
      if(category == 'movie') {
        window.location.pathname = "/pages/movie/"
        localStorage.setItem("movieId", item.id)
      } else if(category == "person") {
        window.location.pathname = "/pages/person/"
        localStorage.setItem("personId", item.id)
      }
    }

    searchResultsContainer.appendChild(newItem);
  }
}

searcher()

function debounce(func, timeout = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout)
  }
}

let modal = document.querySelector(".search_modal")
let openBtn = document.querySelector(".searchbtn");
let closeBtn = document.querySelector(".close");

openBtn.onclick = () => {
  modal.style.visibility = "visible"
}

closeBtn.onclick = () => {
  modal.style.visibility = "hidden"
}

getData("/person/popular")
  .then(res => reloadElem(res.data.results.slice(0, 2)))
  .catch(error => console.error(error))

function reloadElem(arr) {
  let flex = document.querySelector(".flex");
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let divElem = document.createElement("div");
    divElem.classList.add("elem");

    divElem.style.background = `url(https://image.tmdb.org/t/p/original/${item.profile_path})`;
    divElem.style.backgroundSize = "cover";
    divElem.style.backgroundPosition = "center";
    divElem.style.backgroundRepeat = "no-repeat";
    let placeElem = document.createElement("p");
    placeElem.classList.add("place");
    placeElem.textContent = (i === 0) ? "1-е место" : "2-е место";
    let nameElem = document.createElement("p");
    nameElem.classList.add("name");
    nameElem.textContent = item.name;
    let nameEnglishElem = document.createElement("p");
    nameEnglishElem.classList.add("nameenglish");
    nameEnglishElem.textContent = item.original_name;
    let ageElem = document.createElement("p");
    ageElem.classList.add("age");
    ageElem.textContent = (i === 0) ? "26 лет" : "30 лет";
    divElem.appendChild(placeElem);
    divElem.appendChild(nameElem);
    divElem.appendChild(nameEnglishElem);
    divElem.appendChild(ageElem);
    flex.appendChild(divElem);
    divElem.onclick = () => {
      localStorage.setItem("personId", item.id)
      window.location.pathname = "/pages/person/"
    }
  }
}

getData("/person/popular")
  .then(res => reloadOthers(res.data.results.slice(2, 6)))
  .catch(error => console.error(error))

function reloadOthers(arr) {
  let flex = document.querySelector(".flex");
  var otherDiv = document.querySelector(".other");

  var years = [21, 58, 35, 39];

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    var el1 = document.createElement("div");
    el1.className = "el";

    var el1Left = document.createElement("div");
    el1Left.className = "el-left";

    var othername1 = document.createElement("p");
    othername1.className = "othername";
    othername1.textContent = item.name;

    var othernameenglish1 = document.createElement("p");
    othernameenglish1.className = "othernameenglish";
    othernameenglish1.textContent = item.original_name;

    var otherage1 = document.createElement("p");
    otherage1.className = "otherage";
    otherage1.textContent = years[i] + " год";

    el1Left.appendChild(othername1);
    el1Left.appendChild(othernameenglish1);
    el1Left.appendChild(otherage1);

    var el1Right = document.createElement("div");
    el1Right.className = "el-right";

    var otherplace1 = document.createElement("p");
    otherplace1.className = "otherplace";
    otherplace1.textContent = (i + 3) + "-е место";

    el1Right.appendChild(otherplace1);

    el1.appendChild(el1Left);
    el1.appendChild(el1Right);

    otherDiv.appendChild(el1);
    el1.onclick = () => {
      localStorage.setItem("personId", item.id)
      window.location.pathname = "/pages/person/"
    }
  }

  flex.appendChild(otherDiv);
}

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

      let img = document.createElement("img");
      img.src = "https://image.tmdb.org/t/p/original/" + item.poster_path;
      let movieName = document.createElement("div");
      movieName.classList.add("movie-name");

      let title = document.createElement("h6");
      title.textContent = item.title;

      let releaseDate = document.createElement("p");
      releaseDate.textContent = item.release_date;

      movieName.appendChild(title);
      movieName.appendChild(releaseDate);
      itemNew.appendChild(img);
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

getData("movie/now_playing")
  .then(res => {
    reloadNew(res.data.results.slice(0, 20));
    addArrowClickListeners(res.data.results);
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


