import { useEffect, useState } from "react";
import { api } from "../utils";
import { useParams } from "react-router-dom";
import  {colorType} from "../utils"
const SinglePokemon = () => {
  const [pokemon, setpokemon] = useState({});
  const [loading, setloading] = useState(true)
  const params = useParams();
  useEffect(() => {
    let data1 = {};
    let data2 = {};
    const fetchData = async () => {
      data1 = await api(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
        data2 = await api(data1.species.url);
        setpokemon({    ...data1,   ...data2});
        setloading(false)
    };
    fetchData();
  }, []);
  console.log(pokemon)
  return (
    <>
    {!loading? (<div className="card-singlePokemon  w-full" style={{backgroundColor: colorType[pokemon.types[0].type.name],color: "black" }}>
        <h1 className="name" >{pokemon.name}</h1>
        <div className="sprite w-1/5 flex m-auto">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`} className="m-auto min-w-full min-h-full" alt={pokemon.name} />
        </div>
        <div  className=" m-auto rounded-t-[75px] bg-white  information w-full">
        <div className="types flex flex-column justify-around pt-2">
            {pokemon.types?.map((type) => {  return <p key={type.type.name}>{type.type.name}</p> })}
        </div>
       
        <div className="onglet flex flex-row w-full  mx-[10px] pt-[20px] justify-between">
                <div  className="about  hover:text-red-500 font-semibold w-full cursor-pointer  text-center"> about</div>
                <div className="carac w-full text-center hover:text-red-500 font-semibold cursor-pointer"> Base stats</div>
                <div className="ability w-full text-center hover:text-red-500 font-semibold cursor-pointer"> Evolution</div>
                <div className="moves w-full text-center hover:text-red-500 font-semibold cursor-pointer"> Moves</div>
            </div>
            <hr className="border bg-slate-400 mx-auto my-5 w-11/12 text-slate-600" />
        <div className="carac-general flex flex-col w-full  rounded-lg ">
        <div className="about text-center">
            <p>{pokemon.species? (pokemon.flavor_text_entries[15].flavor_text ): "" }</p>
            <div className="morphology w-7/12 m-auto my-10 flex flex-row justify-center gap-20 shadow-lg shadow-slate-600 rounded border border-solid border-slate-300">
                <div className="weight my-auto">
                    <p className="text-gray-500 my-2">Weight</p>
                    <hr />
                    <p>{pokemon.weight}</p>
                </div>
                <div className="height">
                    <p className="text-gray-500 my-2">Height</p>
                    <hr className=""/>
                    <p>{pokemon.height}</p>
                    </div>
            </div>
       </div>
        {/* <div className="stats">
            {pokemon.stats?.map((stat) => {  return <p key={stat.stat.name}>{stat.stat.name} : {stat.base_stat}</p> })}
        </div> */}
        </div>
       
        {/* <div className="abilities hidden">
            {pokemon.abilities?.map((ability) => {  return <p key={ability.ability.name}>{ability.ability.name}</p> })}
        </div>
        <div className="moves hidden">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div>
        <div className="evolutions hidden">
            {pokemon.evolutions?.map((evolution) => {  return <p key={evolution.to}>{evolution.to}</p> })}
        </div>
        <div className="moves hidden">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div> */}
        </div>


    </div>) : (<div>Loading...</div>)}
    
    </>
  )
};

export default SinglePokemon;
