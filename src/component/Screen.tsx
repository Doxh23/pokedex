import React from 'react'
import {Routes, Route} from 'react-router-dom'
import PokemonList from './pages/Home/PokemonList'
import SinglePokemon from './pages/single pokemon/SinglePokemon'
import Category from './pages/Home/Category'
import Abilities from './pages/abilities/Abilities'
import Items from './pages/Items/Items'
import Locations from './pages/locations/Locations'
import Moves from './pages/Moves/Moves'
import Berries from './pages/berries/Berries'
import Error from './pages/Error/Error'

const Component = (props:any) => {
    let   {PokemonData,loading,category,setPokemonData,offSet,setOffSet} = props
  return (
    <>
    <Routes>
          <Route path="/" element={<PokemonList category={Category}   offSet={offSet} setOffSet={setOffSet} loading={loading} setPokemonData={setPokemonData} PokemonData={PokemonData} />} />
          <Route path="/singlePokemon/:id" element={<SinglePokemon />} />
          <Route path="/category/:category" element={<PokemonList category={Category}   offSet={offSet} setOffSet={setOffSet} loading={loading} setPokemonData={setPokemonData} PokemonData={PokemonData} />} />
            <Route path="/moves" element={<Moves />} />
            <Route path="/moves/:id" element={<Moves />} />
            <Route path="/abilities" element={<Abilities />} />
            <Route path="/items" element={<Items />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/berries" element={<Berries />} />

          {/*** no valid route ****/}
          <Route path="*" element={<Error />} />
        </Routes>
    </>
  )
}

export default Component