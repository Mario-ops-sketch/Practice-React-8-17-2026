import './Pokemon_Profile.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { TypeIcon } from './pokemon_icon/type'
import { StatsIcon } from './pokemon_icon/stats'
import { PokemonSpiderGraph } from './Pokemon_spider_graph'
import { Pokeball } from './pokemon_icon/pokeball'

interface Pokemon {
    species: { name: string };
    height: number;
    weight: number;
    types: {
        slot: number;
        type: {
            name: string;
        }
    }[];

    stats: {
        base_stat: number;
        stat: {
            name: string;
        }
    }[];

    moves: {
        slot: number;
        move: {
            name: string;
        }
    }[];
    sprites: {
        front_default: string;
        other: {
            "official-artwork": {
                front_default: string;
            }
            home: {
                front_default: string;
            }
            dream_world: {
                front_default: string;
            }
        }
    };
}

interface PokemonProfileProps {
    activePokemon: string;
}


export function PokemonProfile({ activePokemon }: PokemonProfileProps) {



    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [imgActive, setImgActive] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [noDefaultImg, setNoDefaultImg] = useState(false);
    const [noOfficialImg, setNoOfficialImg] = useState(false)







    useEffect(() => {

        let isCanceled = false;

        const fetchPokemonData = async () => {


            setNotFound(false);
            setPokemonData(null);
            setNoDefaultImg(false);  // Reset state for new search
            setNoOfficialImg(false);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${activePokemon}`);
                const data = response.data
                if (!isCanceled) {
                    setPokemonData(data);
                    if (!data.sprites.other.home.front_default) {
                        setNoDefaultImg(true);
                    }
                    if (!data.sprites.other['official-artwork'].front_default) {
                        setNoOfficialImg(true);
                    }

                }


            } catch (error) {
                if (!isCanceled) {
                    console.error("Error fetching Pokemon:", error);
                    setPokemonData(null);
                    setNotFound(true);
                }
            }
        }

        fetchPokemonData();
        return () => { isCanceled = true; };
    }, [activePokemon]);



    const pokemonName = () => {
        if (!pokemonData) return notFound ? `404: ${activePokemon}` : "Loading";
        const name = pokemonData.species.name;
        const namePokemon = name.charAt(0).toUpperCase() + name.slice(1);
        return namePokemon
    }

    const activePokemonImg = () => {
        setImgActive(!imgActive);
    }




    const homeDefaultImg = pokemonData?.sprites.other.home.front_default;
    const officialArtImg = pokemonData?.sprites.other['official-artwork'].front_default;


    return (
        <div className='pokemon-search-profile'>
            <div className="pokemon-container">
                <div className='pokemon-profile'>
                    <div className='pokemon-img'>
                        {notFound || !pokemonData ? (
                            <>
                                <Pokeball />
                                <div className='pokemonPlatform'></div>
                            </>
                        ) : (
                            <>
                                <img onClick={activePokemonImg} className={`${imgActive ? 'pokeImg active' : 'pokeImg'}`} src={homeDefaultImg} />
                                <img onClick={activePokemonImg} className={`${imgActive ? 'pokeImg' : 'pokeImg active'}`} src={officialArtImg} />
                                <div className='pokemonPlatform'></div>
                            </>
                        )}

                    </div>
                    <div className='pokemon-descrip'>
                        <div className='pokemon-name'>
                            <p>{pokemonName()}</p>
                        </div>
                        <div className='pokemon-type'>
                            {pokemonData?.types.map((typeP, index) => {
                                const typeName = typeP.type.name;
                                const typeCleanName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
                                return (
                                    <p key={index}>{TypeIcon(typeName)}{typeCleanName}</p>
                                );
                            })}
                        </div>
                        <div className='pokemon-units'>
                            <p>Height: {pokemonData?.height} Pokemon Feet</p>
                            <p>Weight: {pokemonData?.weight} Pokemon Grams</p>
                        </div>
                        <div className='pokemon-skill-stat'>
                            <div className='pokemon-skill'>
                                <h1>Skills:</h1>
                                {pokemonData && pokemonData.moves.length > 0 ? (
                                    pokemonData.moves.slice(17, 22).map((moveItem, index) => {
                                        const moveName = moveItem.move.name.replace('-', ' ');
                                        const moveCleanName = moveName.charAt(0).toUpperCase() + moveName.slice(1);

                                        return (
                                            <p className='moves-list' key={index}>
                                                ⚔️ {moveCleanName}
                                            </p>
                                        );
                                    })
                                ) : (
                                    /* This shows if moves are null, undefined, or an empty list */
                                    <p className="moves-list">No moves found for this Pokémon</p>
                                )}
                            </div>
                            <div className='pokemon-stat'>
                                <h1>Stats:</h1>
                                <div className='hexagonGraphHolder'>
                                    <PokemonSpiderGraph
                                        pokemonData={pokemonData || {
                                            stats: [
                                                { base_stat: 0, stat: { name: 'hp' } },
                                                { base_stat: 0, stat: { name: 'attack' } },
                                                { base_stat: 0, stat: { name: 'defense' } },
                                                { base_stat: 0, stat: { name: 'special-attack' } },
                                                { base_stat: 0, stat: { name: 'special-defense' } },
                                                { base_stat: 0, stat: { name: 'speed' } }
                                            ]
                                        }} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );

}