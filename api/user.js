import axios from 'axios'
const apiUrl ='http://10.10.120.185:7777/api';

export const User={
    getUsers:()=>{
        return axios.get(apiUrl+'/users');
    },
    getUser:(id)=>{
        return axios.get(apiUrl+'/users/'+id);
    },
}