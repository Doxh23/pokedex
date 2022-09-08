import React from 'react'
import {Link} from 'react-router-dom'

const Pokemon = (props) => {
   let  {pokemon,takePokemonId} = props
  return (
    <Link className="pokemon-card  pokeballCursor" style={{backgroundColor: "transparent"}} to={`/SinglePokemon/${takePokemonId(pokemon.url)}`} key={takePokemonId(pokemon.url)}>
    <div className=' rounded my-4 bg-purple-900 hover:bg-purple-500 pokemon-card' key={takePokemonId(pokemon.url)}>
    
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