import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export function Pokemon() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const API_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

  let CallAPI = async () => {
    try {
      let response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Pokemon no encontrado");
      }

      let previousData = await response.json();
      setData(previousData);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    CallAPI();
  }, [id]);

  let idString = data ? data.id.toString().padStart(3, "0") : "000";
  let img = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${idString}.png`;

  if (error) {
    return (
      <>
        <Link to="/">Volver</Link>
        <p>❌ Pokémon no encontrado</p>
      </>
    );
  }

  return (
    <>
      {data && (
        <>
          <Link className="button-volver absolute size-1" to="/">Volver</Link>
          <div>
            <h2 className="size-4 pad-1 text-transform-capitalize margin-bottom-2 pad-5">
              {data.name} <span className="OP-50 ">N.{data.id.toString().padStart(4, "0")}</span>
            </h2>
          </div>
      
            <div className="grid-1 grid flex center algin-center  ">
              <img src={img} alt={data.name} />
              </div>
            




              <div className="margin-bottom-5">
                <h3 className="margin-bottom-2  margin-top-2">Tipos</h3>
                <div className="grid-2 grid pad-2 gap-2 border-4 center align-center text-align-center ">
                  {data.types.map((typeObj, index) => (
                    <p key={index}>{typeObj.type.name}</p>
                  ))}
                </div>
                </div>


              <div  className="margin-bottom-5">
                <h3 className="margin-bottom-2  margin-top-2 ">Habilidades</h3>
                <div className="grid-2 grid pad-2 gap-2 border-4 center align-center text-align-center">
                  {data.abilities.map((abilityObj, index) => (
                    <p key={index}>{abilityObj.ability.name}</p>
                  ))}
                </div>
              </div>
              
        </>
      )}
    </>
  );
}
