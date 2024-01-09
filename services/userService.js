import cookie from 'cookie';

//const data = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUXVpcm9zIEFsdmFyYWRvIEVyaWNrIiwic3ViIjoiNzg0MDEzIiwiZW1haWwiOiJlcmljay5xdWlyb3NAcHVibGljaXNyZXNvdXJjZXMuY29tIiwicm9sZSI6IkFkbWluIiwiZ3JvdXBzaWQiOiJMSU9SRSIsIm5iZiI6MTcwMTkyMDg4NiwiZXhwIjoxNzAyNTI1Njg2LCJpYXQiOjE3MDE5MjA4ODYsImlzcyI6InJlc291cmNlcy1wZXJzb25hbC1hdXRoLWFwaSIsImF1ZCI6InJlc291cmNlcy1wZXJzb25hbC0tY2xpZW50In0.RiG0BlrkW-NJ2AWR-OljdXvASWvkoBZF7mVsHIdb3D0";

export const Session = {
    setCookie: (token) => {
        const object = JSON.parse(atob(token.split('.')[1]));
        Object.keys(object).forEach((key) => {
            document.cookie = cookie.serialize(key, object[key], {
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24
            })
        })
        
    },
    removeCookie: (key) => {
        document.cookie = cookie.serialize(key, '', {
            sameSite: 'strict',
            path: '/',
            maxAge: -1
        })
    },
    getCookie: (key) => {
        const cookie = document.cookie;
        const cookieObj = cookie.split(';').reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            acc[key.trim()] = value;
            return acc;
        }, {});
        return decodeURIComponent(cookieObj[key]);
    },
    isAuthenticated: () => {
        const cookie = document.cookie;
        const cookieObj = cookie.split(';').reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            acc[key.trim()] = value;
            return acc;
        }, {});
        return cookieObj['jwt'] ? true : false;
    },
    getJWT: () => {
        return Session.getCookie('jwt');
    },
    getUser: () => {
        const jwt = Session.getJWT();
        if (jwt) {
            return JSON.parse(atob(jwt.split('.')[1]));
        }
        return null;
    },
    getRole: () => {
        const jwt = Session.getJWT();
        if (jwt) {
            const user = JSON.parse(atob(jwt.split('.')[1]));
            return user.role;
        }
        return null;
    },
    getEmployeeId: () => {
        const jwt = Session.getJWT();
        if (jwt) {
            const user = JSON.parse(atob(jwt.split('.')[1]));
            return user.employeeId;
        }
        return null;
    },
    getUserName: () => {
        const jwt = Session.getJWT();
        if (jwt) {
            const user = JSON.parse(atob(jwt.split('.')[1]));
            return user.name;
        }
        return null;
    },
    getBranchId: () => {
        const jwt = Session.getJWT();
        if (jwt) {
            const user = JSON.parse(atob(jwt.split('.')[1]));
        }
    },
    removeCookies: () => {
        Session.removeCookie('jwt');
        Session.removeCookie('role');
        Session.removeCookie('employeeId');
        Session.removeCookie('name');
    },
    setLocalStorage: (token) => {
        const object = JSON.parse(atob(token.split('.')[1]));
        Object.keys(object).forEach((key) => {
            localStorage.setItem(key, object[key]);
        })
    },
    getLocalStorage: (key) => {
        return localStorage.getItem(key);
    },
    removeLocalStorage: (key) => {
        localStorage.removeItem(key);
    },
    clearLocalStorage: () => {
        localStorage.clear();
    },
    startSession: (token) => {
        //Session.setCookie(token);
        Session.setLocalStorage(token);
    },
    endSession: () => {
        //Session.removeCookies();
        Session.clearLocalStorage();
    },
    getKey: (key) => {
        return localStorage.getItem(key);
    },
};