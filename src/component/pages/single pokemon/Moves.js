import React from 'react'
import { useState,useEffect } from 'react'
import { api,categoryMove } from '../../utils'

const Moves = (prop) => {

    const {moveUrl,color ,index} = prop
    const [loading, setloading] = useState(true)
    const [move, setMove] = useState("")
    let bgcolor = ""
    let textColor = ""
    useEffect(() => {
        api(moveUrl).then(res => setMove(res))
        setloading(false)
    }, [])
    
    if(index === 0 || index % 2 === 0){
      bgcolor = "white"
      textColor = color
    } else{
      bgcolor = color
      textColor = "white"
     

    }

    // tm - move -  type - category - power - accuracy - pp
  return (
    <>
    
    <td className={`py-[3px] px-[2px] font-black text-[10px]  `} style={{background: bgcolor,color: textColor}}>{move?.name.toUpperCase()}</td>
    <td className='  font-semibold  ' style={{background: bgcolor,color: textColor}} >{move?.type?.name}</td>
    <td className='font-semibold  ' style={{background: bgcolor,color: textColor}}><img src={`${ categoryMove[move?.damage_class?.name]}`} alt={``} /></td>
    <td className='font-semibold  ' style={{background: bgcolor,color: textColor}}>{move?.power}</td>
    <td className='font-semibold  ' style={{background: bgcolor,color: textColor}}> {move?.accuracy}</td>
    <td className='font-semibold ' style={{background: bgcolor,color: textColor}}> {move?.pp}</td>
    <td className='font-semibold  text-left ' style={{background: bgcolor,color: textColor}}> {move && move?.effect_entries[0]?.effect}</td>
       </> 

  )
}

export default Moves