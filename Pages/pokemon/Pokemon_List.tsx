import axios from "axios";
import { useEffect, useState } from "react"
import { TypeIcon } from "./pokemon_icon/type";
import { Pokeball } from "./pokemon_icon/pokeball";

export function PokemonList({ name, onClick }: { name: string, onClick: () => void }) {
    const [dataCard, setDataCard] = useState<any>(null);
    const [backImg, setBackImg] = useState<string>('');

    useEffect(() => {
        const fetchPokeData = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setDataCard(res.data);
                setBackImg(res.data.sprites.other['official-artwork'].front_default)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchPokeData();
    }, [name])

    const pokemonDataName = () => {
        if (!dataCard) return "";
        const pokemonDataName = dataCard.species.name;
        const cleanName = pokemonDataName.charAt(0).toUpperCase() + pokemonDataName.slice(1);
        return cleanName;
    }


    return (
        <>
            {!dataCard ? (
                <Pokeball />
            ) : (
                <>
                    <div className='pokemon-card'
                        onClick={onClick}
                        style={{
                            backgroundImage: `url(${backImg})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '100% 10%',
                            backgroundSize: '50%',
                            opacity: '1'
                        }}>
                        <h1>{pokemonDataName()}</h1>
                        <div className='pokemon-type'>
                            {dataCard.types.map((typeName: any, index: number) => {
                                const typeData = typeName.type.name;
                                const cleanTypeName = typeData.charAt(0).toUpperCase() + typeData.slice(1);
                                return (
                                    <p key={index}>{TypeIcon(typeData)} {cleanTypeName}</p>
                                );
                            })}

                        </div>
                    </div>
                </>
            )}

        </>
    )
}