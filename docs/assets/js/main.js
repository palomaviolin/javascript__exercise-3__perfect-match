"use strict";const FAVORITES_KEY="favorites";let showResultsContainer=document.body.querySelector("#cards-list"),startGameButton=document.body.querySelector("#start-game-button");function getLocalStorageFavorites(){let t=localStorage.getItem(FAVORITES_KEY)||"[]";return JSON.parse(t)}function addFavorite(t){let e=getLocalStorageFavorites();e.push(t),localStorage.setItem(FAVORITES_KEY,JSON.stringify(e))}function removeFavorite(t){let e=getLocalStorageFavorites(),a=e.indexOf(t);-1!==a&&e.splice(a,1),localStorage.setItem(FAVORITES_KEY,JSON.stringify(e))}function hasFavorite(t){return-1!==getLocalStorageFavorites().indexOf(t.toString())}function toggleFavorite(t){let e=t.currentTarget;e.classList.toggle("show-result-item-active");let a=e.dataset.showId;a&&(e.classList.contains("show-result-item-active")?addFavorite(a):removeFavorite(a))}function viewPokemonCards(){let t=document.querySelector('input[name="playmethods"]:checked').value;fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${t}.json`).then(t=>t.json()).then(t=>{showResultsContainer.innerHTML="";for(const e of t){let t=e.image,a=document.createElement("li");a.className="show-result-item",hasFavorite(e.pair)&&a.classList.add("show-result-item-active"),a.dataset.showId=e.pair;let o=document.createElement("img");o.src=t,a.appendChild(o),a.addEventListener("click",toggleFavorite),showResultsContainer.appendChild(a)}})}startGameButton.addEventListener("click",viewPokemonCards);