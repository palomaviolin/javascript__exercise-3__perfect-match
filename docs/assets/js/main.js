"use strict";
const NUMBER_OF_CARDS_KEY = "number_of_cards";
let showResultsContainer = document.body.querySelector("#cards-list"),
  startGameButton = document.body.querySelector("#start-game-button");
function setNumberOfCards(e) {
  localStorage.setItem(NUMBER_OF_CARDS_KEY, e);
}
function getNumberOfCards() {
  return localStorage.getItem(NUMBER_OF_CARDS_KEY);
}
function viewPokemonCards() {
  let e = document.querySelector('input[name="playmethods"]:checked').value;
  setNumberOfCards(e),
    fetch(
      `https://raw.githubusercontent.com/Adalab/cards-data/master/${e}.json`
    )
      .then(e => e.json())
      .then(e => {
        showResultsContainer.innerHTML = "";
        for (const t of e) {
          let e = t.image,
            n = document.createElement("li");
          n.className = "show-result-item";
          let o = document.createElement("img");
          (o.src = e), n.appendChild(o), showResultsContainer.appendChild(n);
        }
      });
}
function init() {
  let e = getNumberOfCards() || 0,
    t = document.querySelector(`input[name='playmethods'][value='${e}']`);
  t && (t.checked = !0);
}
startGameButton.addEventListener("click", viewPokemonCards), init();
