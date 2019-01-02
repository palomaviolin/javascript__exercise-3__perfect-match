'use strict';

const NUMBER_OF_CARDS_KEY = 'number_of_cards';
let showResultsContainer = document.body.querySelector('#cards-list');
let startGameButton = document.body.querySelector('#start-game-button');

function setNumberOfCards(selectedOption) {
  localStorage.setItem(NUMBER_OF_CARDS_KEY, selectedOption);
}

function getNumberOfCards() {
  return localStorage.getItem(NUMBER_OF_CARDS_KEY);
}

function viewPokemonCards() {
  let query = document.querySelector('input[name="playmethods"]:checked').value;
  setNumberOfCards(query);
  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${query}.json`)
    .then(response => response.json())
    .then(response => {
      showResultsContainer.innerHTML = '';

      for (const pokemonData of response) {
        let pokemonImage = pokemonData.image;

        let showResultItem = document.createElement('li');
        showResultItem.className = 'show-result-item';

        let showImageElem = document.createElement('img');
        showImageElem.src = pokemonImage;
        showResultItem.appendChild(showImageElem);

        showResultsContainer.appendChild(showResultItem);
      }
    });
}

function init() {
  let numOfCards = getNumberOfCards() || 0;
  let radioButton = document.querySelector(`input[name='playmethods'][value='${numOfCards}']`);
  if (radioButton) {
    radioButton.checked = true;
  }
}

startGameButton.addEventListener('click', viewPokemonCards);
init();