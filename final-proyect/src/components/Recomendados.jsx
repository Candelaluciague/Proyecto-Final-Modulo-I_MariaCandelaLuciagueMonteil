import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const tiposPokemon = [
  { tipo: "fire", emoji: "🔥" },
  { tipo: "water", emoji: "💧" },
  { tipo: "grass", emoji: "🌿" },
  { tipo: "electric", emoji: "⚡" },
  { tipo: "psychic", emoji: "🔮" },
  { tipo: "ice", emoji: "❄️" },
  { tipo: "dragon", emoji: "🐉" },
  { tipo: "dark", emoji: "🌑" },
  { tipo: "fairy", emoji: "✨" },
];
    const Recomendados = () => {
  const [selectedType, setSelectedType] = useState("fire");
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonByType = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
      const data = await response.json();
      
      const pokemonList = data.pokemon.slice(0, 10).map((p) => p.pokemon);
      const detailedPokemons = await Promise.all(
        pokemonList.map((p) => fetch(p.url).then((res) => res.json()))
      );

      setPokemons(detailedPokemons);
    };

    fetchPokemonByType();
  }, [selectedType]);

  return (
    
    <div className="margin-top-6 text-align-center">
    <Link className="button-volver absolute size-1" to="/">Volver</Link> 

      

      <div className="flex justify-center gap-5 pad-1 margin-1">
        {tiposPokemon.map(({ tipo, emoji }) => (
          <button
            key={tipo}
            onClick={() => setSelectedType(tipo)}
            className={`button-type font-weight-bold border-3 size-1 r-2 center align-center margin-bottom-4 ${
              selectedType === tipo ? "bg-primary" : "bg-secondary"
            }`}
          >
            {emoji} {tipo}
          </button>
        ))}
      </div>



      <div className="filter-pokemon grid gap-6 grid-4 pad-5 ">
        {pokemons.map((pokemon) => {
          const id = pokemon.id.toString().padStart(3, "0");
          const img = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${id}.png`;

          return (
       
            <div key={pokemon.id} className=" size-1 text-transform-capitalize pad-4 align-center center flex flex-column  pkmon">
              <img src={img} alt={pokemon.name} className="img-pokemon" />
              <h2>{pokemon.name}</h2>
              <p className="size-1">Exp: {pokemon.base_experience}</p>
              <button className="button-type-2 margin-3 border-2 r-2 size-1">
              < Link to={`/pokemon/${pokemon.id}`}>Ver más</Link>
                </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recomendados;
