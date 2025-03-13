import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <nav>
      <h2 className="flex center align-center margin-top-5 size-3">
          {location.pathname === "/" 
              ? "🔥Bienvenido a la Pokédex🔥" 
              : location.pathname.startsWith("/pokemon/") 
              ? "🔥Descubre tu Pokémon🔥" 
              : "🔥Pokémon Recomendados🔥"}
      </h2>


        <ul className="flex center align-center gap-4 margin-top-5">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/recomendados">Recomendados</Link></li>
        </ul>
      </nav>
      
     
    </header>
  );
};

export default Header;
