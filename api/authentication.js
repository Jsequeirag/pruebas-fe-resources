import axios from 'axios'
import {Session} from '../services/userService'

const apiUrl ='http://10.10.120.185:7777/api/Auth';
//const apiUrl='http://localhost:7001/api/Auth';

export const Auth={
    register:(data)=>{
        console.log(data);
        return axios.post(apiUrl +'/Register?EmployeeId='+data);
    },
    login: (data) => {
        try {
            console.log(data);
            const res = axios.post(apiUrl + '/Login', data);
            console.log(res);
  
            return res;
        }catch(error){
            throw error;
        }
    },
    updatePass: (data) => {
        console.log(data);
        return axios.post(apiUrl+'/ChangePassword',data);
    }
}