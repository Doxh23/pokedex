import React from 'react'

const Pokemon = (props) => {
   let  {pokemon,takePokemonId} = props
  return (
    <div className="pokemon-card" key={takePokemonId(pokemon.url)}>
                <h2>{pokemon.name}</h2>
                <img
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
  )
}

export default Pokemon