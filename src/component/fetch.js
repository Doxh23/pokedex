
import axios from 'axios';

 const api =async (url) => {
  const data = await axios.get(url).then(res => res.data);
 return data
    
}

 export {api};