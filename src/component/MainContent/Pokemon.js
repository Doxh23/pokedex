import React from 'react'
import {Link} from 'react-router-dom'
import Card from "@mui/material/Card";
import {purple} from "@mui/material/colors";

const Pokemon = (props) => {
   let  {pokemon,takePokemonId} = props
  return (
    <Link className="pokemon-card" style={{backgroundColor: "transparent"}} to={`/SinglePokemon/${takePokemonId(pokemon.url)}`} key={takePokemonId(pokemon.url)}>
    <div className=' rounded bg-purple-900 hover:bg-purple-500 pokemon-card' key={takePokemonId(pokemon.url)}>
    
                <h2>{pokemon.name}</h2>
                <img className='m-auto'
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${takePokemonId(
                    pokemon.url
                  )}.png`}
                  alt={pokemon.name}
                />
                <p>
                  #
                  {takePokemonId(pokemon.url) < 10
                    ? `00${takePokemonId(pokemon.url)}`
                    : takePokemonId(pokemon.url) < 100
                    ? `0${takePokemonId(pokemon.url)}`
                    : takePokemonId(pokemon.url)}
                </p>
                </div>
              </Link>
  )
}

export default Pokemon