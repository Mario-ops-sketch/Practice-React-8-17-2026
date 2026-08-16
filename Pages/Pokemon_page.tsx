import './Pokemon-page.css';
import { PokemonProfile } from './pokemon/Pokemon_Profile';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { SuggestedPokemon } from './pokemon/Pokemon_suggestion';
import { TypeIcon } from './pokemon/pokemon_icon/type';
import { PokemonList } from './pokemon/Pokemon_List';



export function PokemonPage() {

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchPokemon, setSearchPokemon] = useState('Pikachu');
    const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [activePokemon, setActivePokemon] = useState(searchPokemon);
    const [dataCard, setDataCard] = useState([]);


    useEffect(() => {
        const getAllNames = async () => {
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000');
                // Fixed the map return here:
                const names = res.data.results.map((p: any) => p.name);
                console.log(names);
                setAllPokemonNames(names);
            } catch (err) {
                console.log(err);
            }
        }
        getAllNames();
    }, []);



    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setActivePokemon(searchPokemon)
        }
    }

    const selectPokemon = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pokemonName = event.target.value;
        const lowerCaseName = pokemonName.toLowerCase();
        setSearchPokemon(pokemonName.toLowerCase());

        if (lowerCaseName.length > 0) {
            const matches = allPokemonNames.filter(name => name.startsWith(lowerCaseName))
                .slice(0, 11);
            setSuggestion(matches);
        }
        else {
            setSuggestion([]);
        }
    }
    const clearPokemonSearch = () => {
        setSearchPokemon('');
        setSuggestion([]);
        inputRef.current?.focus();
    }


    return (
        <>
            <div className='pokemon-container'>
                <PokemonProfile activePokemon={activePokemon} />
                <div className='pokemon-search-holder'>
                    <div className='search-box'>
                        <label htmlFor='search-pokemon'><i className="fa-solid fa-magnifying-glass"></i></label>
                        <input ref={inputRef} value={searchPokemon} onChange={selectPokemon} onKeyDown={handleKeyDown} id='search-pokemon' type="text" placeholder='Search' />
                        <button onClick={clearPokemonSearch} className='clear-btn'><i className="fa-solid fa-x"></i></button>
                    </div>
                    {suggestion.length > 0 && (
                        <ul className='suggested-list'>
                            {suggestion.map((name) => {

                                return (
                                    <SuggestedPokemon
                                        key={name}
                                        name={name}
                                        onClick={() => {
                                            setActivePokemon(name);
                                            setSearchPokemon(name);
                                            setSuggestion([]);
                                            inputRef.current?.focus();
                                        }} />
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className='pokemon-list'>
                {allPokemonNames?.slice(0, 51).map((name) =>
                    <PokemonList key={name} name={name}
                        onClick={() => {
                            setActivePokemon(name);
                            setSearchPokemon(name);
                        }} />
                )}
            </div>
        </>


    );
}