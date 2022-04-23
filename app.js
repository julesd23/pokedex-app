const poke_container = document.getElementById('poke_container');
const pokemonNumber = 151;
const searchBar = document.getElementById('searchBar');
var pokemon = [];


searchBar.addEventListener('keyup', (e) => {

    const input = e.target.value
    var filter = input.toLowerCase();
    var nodes = document.getElementsByClassName('card');
  
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "block";
      } else {
        nodes[i].style.display = "none";
      }
    }
    
})
const fetchPokemons = async () => {
	for (let i = 1; i <= pokemonNumber; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	
    pokemon = await res.json();
    
    createGrid(pokemon);
    console.log(pokemon);
    
};


function createGrid(pokemon) {
    pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const pokeAbilities = pokemon.abilities.map(abilities => abilities.ability.name);
    const abilities = pokeAbilities.join(', ');
    const sprites = pokemon.sprites.other.dream_world.front_default
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = poke_types.join(', ');

const pokeInnerHTML = `

<div class="card" id="card">
  <div class="card-header">${name}</div>
  <div class="card-body">
  <img class="pokemon-sprite" src="${sprites}"></img>
  </div>
  <h5 class="card-title">#${pokemon.id.toString().padStart(3, '0')}</h5>
  <h5 class="h5" > Type: </h5>
  <p> ${type} </p>
  <h5 class="h5" > Abilities: </h5>
  <p> ${abilities} </p>
</div>

`;


    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}
fetchPokemons();