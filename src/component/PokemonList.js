import React from 'react'
import Pokemon from './Pokemon'

const PokemonList = (props) => {
    let {PokemonData} = props
    const takePokemonId = (url) => {
        const id = url.split("/")[url.split("/").length - 2];
        return id;
      };
  return (
   <>
{PokemonData &&
          PokemonData.map((pokemon) => {
            return (
              <Pokemon key={takePokemonId(pokemon.url)} takePokemonId={takePokemonId} pokemon={pokemon} />
            );
          })}
          </>
  )
}

export default PokemonList