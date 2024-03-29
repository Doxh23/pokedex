import React,{useEffect,useState} from 'react'
import { api,colorType } from '../../utils'
import {Link} from 'react-router-dom'

const Pokemon = (props) => {
   let  {pokemon,takePokemonId} = props 
   const [dataPokemon, setDataPokemon] = useState(null)
   useEffect(() => {
    const fetchData = async () => {
      const data = await api(pokemon.url);
      setDataPokemon(data);
    };
    fetchData();
  }, []);
  console.log(dataPokemon)
  return (
    <div className=' rounded my-4 bg-purple-900 hover:bg-purple-500 pokemon-card' key={takePokemonId(pokemon.url)}>
    
                <h2 className='text-white font-semibold text-xl text-center'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
</h2>
                <img className='m-auto'
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${takePokemonId(
                    pokemon.url
                  )}.png`}
                  alt={pokemon.name}
                  key={takePokemonId(pokemon.url)}
                />
                <div className="types flex flex-row text-center justify-center gap-36">
                {dataPokemon && dataPokemon.types.map((type) => (
                  <p key={type.type.name} style={{color : colorType[type.type.name]}} className="text-white font-semibold text-xl text-center">{type.type.name}</p>
                ))}
                </div>
                <p className='text-white text-center font-semibold'>
                  #
                  {takePokemonId(pokemon.url) < 10
                    ? `00${takePokemonId(pokemon.url)}`
                    : takePokemonId(pokemon.url) < 100
                    ? `0${takePokemonId(pokemon.url)}`
                    : takePokemonId(pokemon.url)}
                </p>
                </div>
              
  )
}

export default Pokemon