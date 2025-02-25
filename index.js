/**
 * @typedef Party
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events";
const COHORT = "/2412"; // Make sure to change this!
const RESOURCE = "/parties";
const API = BASE + COHORT + RESOURCE;

// === State ===
let parties = [];
let selectedParty;

async function getParties() {
    try {
        const response = await fetch(API);
        const result = await response.json();
        parties = result.data;
        render();
    } catch (e) {
        console.error(e);
    }
}

async function getParty(id) {
    try {
        const response = await fetch(API + "/" + id);
        const result = await response.json();
        selectedParty = result.data;
        render();
    } catch (e) {
        console.error(e);
    }
}

// === Components ===
function PartyListItem(party) {
    const $li = document.createElement("li");
    $li.innerHTML = `
        <a href="#selected">${party.name}</a>
    `;
    $li.addEventListener("click", () => getParty(party.id));
    return $li;
}

function PartyList() {
    const $ul = document.createElement("ul");
    $ul.classList.add("lineup");

    const $parties = parties.map(PartyListItem);
    $ul.replaceChildren(...$parties);

    return $ul;
}

function PartyDetails() {
    if (!selectedParty) {
        const $p = document.createElement("p");
        $p.textContent = "Please select a party to learn more.";
        return $p;
    }

    const $party = document.createElement("section");
    $party.classList.add("party");
    $party.innerHTML = `
        <h3>${selectedParty.name} #${selectedParty.id}</h3>
        <figure>
            <img alt=${selectedParty.name} src=${selectedParty.imageUrl} />
        </figure>
        <p>${selectedParty.description}</p>
    `;
    return $party;
}

// === Render ===
function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
     <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Lineup</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
    `;
}

async function init() {
    await getParties();
    render();
}

init();