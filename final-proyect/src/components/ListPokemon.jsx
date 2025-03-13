import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style.css';

export function ListPokemon() { 
    const [data, setData] = useState([]);
    const[offset, setOffset] = useState(0);
    const API_URL = "https://pokeapi.co/api/v2/pokemon?offset" + offset; 


    let CallApi = async () => {
            let response = await fetch(API_URL);
            let prev = await response.json();

            let newData; 

            if (Object.keys(data).length > 0) 
                
                { 
                    newData = [...data, ...prev.results]; 
                }

            else
            { 
                
               newData = prev.results; 
            }

            

            setData(newData); 
    }

    useEffect(() => {
        CallApi();
    }, [offset]); 



    let LoadMore = () => {
        let newOffset = offset + 20;
        setOffset(newOffset);

    };


    let LoadLess = () => {
        setData (data.slice(0, 20))
    }


    return (
        <>
        <section id="List" className="grid grid-5 align-start pad-6 gap-5"> 
            {Object.keys(data).length > 0 &&
               data.map((pkemon, i) => {

                    let id = i + 1;
                    let idstr = id.toString().padStart(3, "0");

let img = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${idstr}.png`;


                    return (
                        <div key={pkemon.name} className="pokemon-item margin-1 pad-3 align-center  "> 
                            <img src={img} className="pokemon-image margin-top-3 " /> 
                            <p className="font-weight-bold size-2 id-pokemon">{idstr}</p> 
                            <h2 className="size-2 font-weight-bold text-transform-capitalize pokemon-name">{pkemon.name}</h2> 
                            <Link className="button align-center center flex margin-top-1 r-1" to={"/pokemon/" + id}>Ver más</Link>                        </div>
                    )
                })
            }

        </section>

        
       <div className="flex align-center center gap-1  button-cargas"> 
        <a onClick={( ) => LoadLess ()} className="button-center flex align-center center r-3 gap-3 pad-1 ">Cargar menos</a>
        <a onClick={( ) => LoadMore ()} className="button-center flex align-center center r-3 gap-3 pad-1">Cargar más</a>
        </div>
        </>
    )
}


