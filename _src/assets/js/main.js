'use strict';

const FAVORITES_KEY = 'favorites';
let showResultsContainer = document.body.querySelector('#cards-list');
let startGameButton = document.body.querySelector('#start-game-button');

function getLocalStorageFavorites() {
  let favorites = localStorage.getItem(FAVORITES_KEY) || '[]';
  return JSON.parse(favorites);
}

function addFavorite(showId) {
  let favorites = getLocalStorageFavorites();
  favorites.push(showId);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function removeFavorite(showId) {
  let favorites = getLocalStorageFavorites();
  let indexToDelete = favorites.indexOf(showId);
  if (indexToDelete !== -1) {
    favorites.splice(indexToDelete, 1);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function hasFavorite(showId) {
  let favorites = getLocalStorageFavorites();
  if (favorites.indexOf(showId.toString()) !== -1) {
    return true;
  }
  return false;
}

function toggleFavorite(event) {
  let toggledResultItem = event.currentTarget;
  toggledResultItem.classList.toggle('show-result-item-active');

  let showId = toggledResultItem.dataset.showId;

  if (showId) {
    if (toggledResultItem.classList.contains('show-result-item-active')) {
      addFavorite(showId);
    } else {
      removeFavorite(showId);
    }
  }
}

function viewPokemonCards() {
  let query = document.querySelector('input[name="playmethods"]:checked').value;
  fetch(
    `https://raw.githubusercontent.com/Adalab/cards-data/master/${query}.json`
  )
    .then(response => response.json())
    .then(response => {
      showResultsContainer.innerHTML = '';

      for (const pokemonData of response) {
        let pokemonImage = pokemonData.image;

        let showResultItem = document.createElement('li');
        showResultItem.className = 'show-result-item';

        if (hasFavorite(pokemonData.pair)) {
          showResultItem.classList.add('show-result-item-active');
        }

        showResultItem.dataset.showId = pokemonData.pair;

        let showImageElem = document.createElement('img');
        showImageElem.src = pokemonImage;
        showResultItem.appendChild(showImageElem);

        showResultItem.addEventListener('click', toggleFavorite);

        showResultsContainer.appendChild(showResultItem);
      }
    });
}

startGameButton.addEventListener('click', viewPokemonCards);
