import axios from 'axios';


const instance = axios.create({
   baseURL : 'https://react-my-burger-1b126.firebaseio.com/'  
});


export default instance;