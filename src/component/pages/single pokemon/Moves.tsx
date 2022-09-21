import React from 'react'
import { useState,useEffect } from 'react'
import { categoryMove } from '../../utils'
import { Move } from './type'
import axios from 'axios'

const Moves = (prop:any) => {

    const {moveUrl,color ,index} = prop
    const [loading, setloading] = useState(true)
    const [move, setMove] = useState<Move>()
    let bgcolor = ""
    let textColor = ""
    useEffect(() => {
        const fetchMove = async (url:string) => {
       let data = await axios.get(url).then(res => res.data);
       setMove(data)

        setloading(false)
        }
        fetchMove(moveUrl)
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
    
    <td className={`py-[3px] px-[2px] font-black text-[10px]  `} style={{background: bgcolor,color: textColor}}>{move?.name?.toUpperCase()}</td>
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