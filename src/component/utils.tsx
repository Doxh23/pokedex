
import axios from 'axios';
import { Move, Pokemon } from './pages/single pokemon/type';

  const api =async (url:string) => {
  const data:any = await axios.get(url).then(res => res.data);
 return data
    
}
    const colorType = {
      grass: "#49d0b0",
      poison: "#A040A0",
      fire: "#F08030",
      flying: "#A890F0",
      bug: "#A8B820",
      normal: "#A8A878",
      electric: "#F8D030",
      ground: "#E0C068",
      fairy: "#EE99AC",
      psychic: "#F85888",
      rock: "#B8A038",
      water: "#6890F0",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      ice: "#98D8D8",
      ghost: "#705898",
      fighting: "#C03028",
    };
    const categoryMove = {
      physical: 'https://img.pokemondb.net/images/icons/move-physical.png',
      special: "https://img.pokemondb.net/images/icons/move-special.png",
      status: "https://img.pokemondb.net/images/icons/move-status.png",
    };
    
 export {api,colorType,categoryMove};