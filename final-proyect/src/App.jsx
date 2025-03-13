import  {Routes,Route, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { NotFound } from "./components/NotFound";
import { Searcher } from "./components/Searcher";
import { ListPokemon } from "./components/ListPokemon";
import { Pokemon } from "./components/Pokemon";
import { ThemeToggle } from "./components/ThemeToggle";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Recomendados from "./components/Recomendados";
import './style.css';


function App() {

const [search, setSearch] = useState("");const navigate = useNavigate();

console.log("Estado global search:", search);

let sendSearch = (value) => { setSearch(value);}

useEffect(() => {

if(search != ""){ navigate("/pokemon/" + search);}


}, [search]);

    return (
        <>
            
            <Header />
            <Searcher sendSearch={setSearch} />
            <ThemeToggle />


            <Routes> 
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<ListPokemon />} />
                <Route path="/pokemon/:id" element={<Pokemon />} />
                <Route path="/recomendados" element={<Recomendados/>} />
            </Routes>
            <Footer />
            
    </>
    );
}

export default App;