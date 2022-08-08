
import axios from 'axios';

 const api =async (url) => {
  const data = await axios.get(url).then(res => res.data);
 return data
    
}
    const colorType = {
      grass: "#78C850",
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
      shadow: "#000000",
      unknown: "#000000",
    };
 export {api,colorType};