import React from 'react'
import { useState,useEffect } from 'react'
import { api } from '../../utils'

const Moves = (prop) => {
    const {moveUrl} = prop
    const [move, setMove] = useState("")
    useEffect(() => {
        api(moveUrl).then(res => setMove(res))
    }, [])
    console.log(move)
    // tm - move -  type - category - power - accuracy - pp
  return (
    <>
    <td>test</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </>
  )
}

export default Moves