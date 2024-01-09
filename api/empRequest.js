import axios from 'axios'

const apiUrl = 'http://10.10.120.185:7777/api';
//tests APIs
//const apiUrl='https://de84c842-946e-430d-9dd5-cd9828ee92ee.mock.pstmn.io';
//const apiUrl='https://48806119-363f-4b89-ad1f-2285943679de.mock.pstmn.io';

export const EmpRequest = {
    submitRequest: (data) => {
        const specialRequestData =
        {
            specialRequest: {
                ...data,
            },
            files: null
        };
        console.log(specialRequestData);
        return axios.post(apiUrl + '/SpecialRequest/Create', specialRequestData);
    },
    updateRequest: (requestId,statusUpdated) => {
        const specialRequestData = {
     
                 specialRequest_Id:requestId,
                 state_Id: statusUpdated,
  
        };
        console.log(specialRequestData);
        return axios.put(apiUrl + '/SpecialRequest/ChangeState', specialRequestData);
    },
    getRequestsByBoss: (bossId) => {
        return axios.get(apiUrl + '/SpecialRequest/ByBoss?Id=' + bossId);
    },
    getRequestsByBossPending: (bossId) => {
        return axios.get(apiUrl + '/SpecialRequest/ByBossPending?Id=' + bossId);
    },
    getRequestByUser: (userId) => {
        return axios.get(apiUrl + '/SpecialRequest/ByUser?Id=' + userId);
    },
    getRequestById: (requestId) => {
        return axios.get(apiUrl + '/SpecialRequest/ById?Id=' + requestId);
    },
    getAllRequests: () => {
        const res = axios.get(apiUrl + '/SpecialRequest/All');
        return res;
    },
    getRequestTypes: (conjunctId) => {
        return axios.get( apiUrl+ '/TypeSpecialRequest/ByConjunct?Id='+conjunctId);
    },
    getHomeData: (userId) => {
        return axios.get(apiUrl + '/SpecialRequest/HomeSpecialRequestCount?Id=' + userId);
    },
    removeCookies: () => {
        Session.removeCookie('jwt');
        Session.removeCookie('role');
        Session.removeCookie('unique_name');
        Session.removeCookie('name');
    }
 
}