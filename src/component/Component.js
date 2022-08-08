import React from 'react'
import {Routes, Route} from 'react-router-dom'
import PokemonList from './MainContent/PokemonList'
import SinglePokemon from './single pokemon/SinglePokemon'
import Category from './MainContent/Category'
const Component = (props) => {
    let   {PokemonData,loading,category,setPokemonData} = props
  return (
    <>
    <Routes>
          <Route path="/" element={<PokemonList category={Category} loading={loading} setPokemonData={setPokemonData} PokemonData={PokemonData} />} />
          <Route path="/singlePokemon/:id" element={<SinglePokemon />} />
        </Routes>
    </>
  )
}

export default Component