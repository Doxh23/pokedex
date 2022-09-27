import React from 'react'
import { Link } from 'react-router-dom'
import { colorType } from '../../utils'
const Evolution = (prop:any) => {
    const {evolution,handleTabsChange,pokemonColor} = prop
    console.log(pokemonColor)
  return (
    <>
    
    {Object.keys(evolution).map((key, index) => {
                    return (
                      <Link 
                        key={index}
                        className="evolution flex flex-col items-center gap-5 p-4 text-white font-medium text-center rounded"
                        style={{backgroundColor: colorType[pokemonColor]} }
                        onClick={() => handleTabsChange("About")}
                        to={`/SinglePokemon/${evolution[key].id}`}
                      >
                        <div className="evolutionName text-center">
                          {evolution[key].name}
                        </div>
                        <div className="evolutionImage">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution[key].id}.png`}
                          />
                        </div>
                        <div className="evolutionType">
                          {evolution[key].evolution_details[0]?.trigger?.name}
                        </div>
                        <div className="evolutionLevel">
                          {evolution[key].evolution_details[0]?.min_level
                            ? evolution[key].evolution_details[0]?.min_level +
                              " Min Level"
                            : evolution[key].evolution_details[0]?.min_happiness
                            ? evolution[key].evolution_details[0]
                                ?.min_happiness + " minimum Happiness"
                            : ""}
                        </div>
                      </Link>
                    );
                  })}
    </>
  )
}

export default Evolution