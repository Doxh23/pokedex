import React from 'react'
import {Routes, Route} from 'react-router-dom'
import PokemonList from './pages/Home/PokemonList'
import SinglePokemon from './single pokemon/SinglePokemon'
import Category from './pages/Home/Category'
const Component = (props) => {
    let   {PokemonData,loading,category,setPokemonData,offSet,setOffSet} = props
  return (
    <>
    <Routes>
          <Route path="/" element={<PokemonList category={Category}   offSet={offSet} setOffSet={setOffSet} loading={loading} setPokemonData={setPokemonData} PokemonData={PokemonData} />} />
          <Route path="/singlePokemon/:id" element={<SinglePokemon />} />
        </Routes>
    </>
  )
}

export default Component