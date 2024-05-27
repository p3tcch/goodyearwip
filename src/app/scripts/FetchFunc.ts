import Cookies from "js-cookie";

export default async function fetchFunc(url: string, object: Object = {}, token: string = '') {
    try {
       const res = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin':'*',
             
          },
          body: JSON.stringify(object),
       });
       const data = await res.json();
       if (data) {
          return data;
       };
    } catch (error) {
       console.error('Error fetching files:', error);
       return null;
    }
 }
