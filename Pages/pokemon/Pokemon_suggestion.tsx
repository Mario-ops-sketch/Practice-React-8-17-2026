import { useEffect, useState } from 'react';
import axios from 'axios';

export function SuggestedPokemon ({name, onClick}: {name: string, onClick: () => void}) {
    const [pokemonImgData, setPokemonImgData] = useState<string>('');

    useEffect(() => {
        const fetchImg = async () => {
            try{
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemonImgData(res.data.sprites.other['official-artwork'].front_default);
            }
            catch(e){
                console.error("No thumb for", name)
            }
        }
        fetchImg();
    }, [name]);

    return(
        <li onClick={onClick}
            style={{
                backgroundImage: `url(${pokemonImgData})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '100% 10%',
                backgroundSize: '25%',
                opacity: '0.6'

            }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
        </li>
    )

}