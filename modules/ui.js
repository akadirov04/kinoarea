import { signOut } from "firebase/auth"
import { auth } from "../firebase.config"

export function header() {
  let header = document.querySelector("header")
  
  header.innerHTML = ` <div class="left">
  <div class="top-left">
      <img class="logo" src="../../img/cinema 1.svg" alt="">
      <h1><span class="blue">Kino</span>area</h1>
  </div>
  <div class="bottom-left">
      <img src="../../img/23123123.svg" alt="">
  </div>
</div>
<div class="menu">
  <a href="">Афиша</a>
  <a href="">Медиа</a>
  <a href="">Фильмы</a>
  <a href="">Актеры</a>
  <a href="">Новости</a>
  <a href="">Подборки</a>
  <a href="">Категории</a>
</div>
<div class="right">
  <button class="searchbtn">
      <img src="../../img/search.svg" alt="">
  </button>
  <button class="signin">
      Войти
  </button>
  <p class="username"></p>
  <div class="avatar"></div>
  <button class="logout">
  ->
  </button>
</div>`
  let logout = document.querySelector(".logout")
  logout.onclick = () => {
    signOut((auth))
    .then(() => console.log("user logged out"))
    .catch(error => console.error("Error signing out", error))
}}

export function reloadMovies(arr, box) {
    let main = document.querySelector(".main")
    box.innerHTML = ""
    for (let items of arr) {
      let item = document.createElement('div');
      item.className = 'item';
  
      let movieImg = document.createElement('div');
      movieImg.className = 'movie-img';
  
      let img = document.createElement('img');
      img.src = "https://image.tmdb.org/t/p/original/" + items.poster_path; 
  
      let rating = document.createElement('div');
      rating.className = 'rating';
      rating.textContent = items.vote_average.toFixed(1);
  
      let movieName = document.createElement('div');
      movieName.className = 'movie-name';
  
      let h6 = document.createElement('h6');
      h6.textContent = items.title;
  
      let p = document.createElement('p');
  
      movieImg.appendChild(img);
      movieImg.appendChild(rating);
  
      movieName.appendChild(h6);
      movieName.appendChild(p);
  
      item.appendChild(movieImg);
      item.appendChild(movieName);
  
      box.appendChild(item);
      item.addEventListener("mouseover", function () {
        main.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${items.poster_path}')`;
      });
    
      item.addEventListener("mouseout", function () {
        main.classList.remove("hovered");
      });
      item.onclick = () => {
        localStorage.setItem("movieId", items.id)
        window.location.pathname = "/pages/movie/"
        main.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${items.poster_path}')`;
      }
    }
  }