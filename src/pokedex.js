const pokedex = document.getElementById('pokedex');

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
	  var x, i,tr;
	  x = document.getElementById('pokedex');
	  if (c == "all") c = "";
	  tr = x.getElementsByTagName("li");  
	  for (i = 0; i < tr.length; i++) {
	 
		  
	    w3RemoveClass(tr[i], "show");
	    if (tr[i].textContent.indexOf(c) > -1) w3AddClass(tr[i], "show");
	  }
	}

	function w3AddClass(element, name) {
	  var i, arr1, arr2;
	  arr1 = element.textContent.split(",");
	  arr2 = name.split(" ");
	  for (i = 0; i < arr2.length; i++) {
	    if (arr1.indexOf(arr2[i]) == -1) {element.textContent += " " + arr2[i];}
	  }
	}

	function w3RemoveClass(element, name) {
	  var i, arr1, arr2;
	  arr1 = element.textContent.split(",");
	  arr2 = name.split(" ");
	  for (i = 0; i < arr2.length; i++) {
	    while (arr1.indexOf(arr2[i]) > -1) {
	      arr1.splice(arr1.indexOf(arr2[i]), 1);     
	    }
	  }
	  element.className = arr1.join(" ");
	}

	// Add active class to the current button (highlight it)
	var btnContainer = document.getElementById("myBtnContainer");
	var btns = btnContainer.getElementsByClassName("btn");
	for (var i = 0; i < btns.length; i++) {
	  btns[i].addEventListener("click", function(){
	    var current = document.getElementsByClassName("active");
	    current[0].className = current[0].className.replace(" active", "");
	    this.className += " active";
	  });
	}
