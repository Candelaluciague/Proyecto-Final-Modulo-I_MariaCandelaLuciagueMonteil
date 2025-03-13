import {useState} from 'react';

export function Searcher({sendSearch}) {

    const [search, setSearch] = useState("");

    let changeSearch = (e) => {

      
        e.preventDefault();

        sendSearch(search.toLocaleLowerCase());

    }

    
    
    return (
      <div className="flex align-center center margin-top-3">
        <form className="search-form flex center align-center gap-3" onSubmit={changeSearch}>
          <input
          
            className=" input pad-2 border-2 r-3 size-1 margin-top-3"
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />
          
          <i className="fa-solid fa-magnifying-glass size-2 center align-center flex margin-top-2 "></i>
          
        </form>
      </div>
    );
  }