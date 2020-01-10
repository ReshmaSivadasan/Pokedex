const pokedex = document.getElementById('pokedex');
var data = [];
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        data=pokemon;
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onclick="selectPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <h1 class="card-title">${pokeman.id}. ${pokeman.name}</h1>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = (id) => {
	
	const promises = [];
    
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        promises.push(fetch(url).then((res) => res.json()));
    
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPopup(pokemon);
    });
	
};

const displayPopup = (pokemon) => {
	const type = pokemon.map((pokemon) => pokemon.type).join(', ');
	console.log(type);
	const htmlString =`
	<div class= "popup" >
	<button id= "closeBtn" onclick ="closePopup()">X</button>
	<div class="card">
            <img class="card-image" src="${pokemon[0].image}"/>
            <h1 class="card-title">${pokemon[0].id}. ${pokemon[0].name}</h1>
            <p><small>Type : </small>${type}
    </div>
	
	</div>
	`;
	
	pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
	
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};


fetchPokemon();

	function myFunction() {
	  // Declare variables 
	  var input, filter, table, tr, td, i, txtValue;
	  input = document.getElementById("mypoke");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("pokedex");
	  tr = table.getElementsByTagName("li");
	
	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i];
	    if (td) {
	      txtValue = td.textContent || td.innerText;
	      if (txtValue.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    } 
	  }
	}
	
	filterSelection("all")
	function filterSelection(c) {
	  var x, i,tx;
	  table = document.getElementById("pokedex");
	  tx = table.getElementsByTagName("li");
	  
	  for(var i=0;i<data.length; i++){
		tr = data[i].type; 
		if (c == "all") {
			tx[i].style.display = "";
		}
		else if(tr == c){
			 tx[i].style.display = "";
		}
		 else {
		        tx[i].style.display = "none";
		 }
	  }
}
