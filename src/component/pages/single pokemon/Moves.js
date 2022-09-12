import React from 'react'
import { useState,useEffect } from 'react'
import { api,categoryMove } from '../../utils'

const Moves = (prop) => {
  
    const {moveUrl} = prop
    const [loading, setloading] = useState(true)
    const [move, setMove] = useState("")
    useEffect(() => {
        api(moveUrl).then(res => setMove(res))
        setloading(false)
    }, [])
    console.log(move)
    

    // tm - move -  type - category - power - accuracy - pp
  return (
    <>
    
    <td className='py-[3px] px-[2px]'>{move?.name}</td>
    <td>{move?.type?.name}</td>
    <td><img src={`${ categoryMove[move?.damage_class?.name]}`} alt={``} /></td>
    <td>{move?.power}</td>
    <td> {move?.accuracy}</td>
    <td> {move?.pp}</td>
    <td> {move && move?.effect_entries[0]?.effect}</td>
    
    
       </> 

  )
}

export default Moves