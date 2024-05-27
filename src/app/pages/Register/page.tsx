'use client'

import "../userstyle.css";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Header from "@/app/components/Header/page";

export default function Register() {
  
  async function FetchRegister(url: string, user: Object) {
   
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await res.json();
    return data;

  }
  
  const [InformText, SetInformText] = useState(['','']);
  
  const GetUser = async (formdata: FormData) => {

    const username:string | any = formdata.get('username');
    const password:string | any = formdata.get('password');
    const confirm_password:string | any = formdata.get('confirm_password');

    const result = await FetchRegister( process.env.API_ROUTE + 'user/register', {username, password, confirm_password}); 
    SetInformText(result.txts);
    if(result.token) Cookies.set('token', result.token);
   
  }
  
  return (
    
    <div>
        <Header/>
        <div className="userstyle-body flex jcenter acenter">
          
         
          <form action={GetUser} className="userstyle-container flex jcenter acenter dircol">
            <h1> Register </h1>
            <br>
            </br>
            <input id="username" name="username" className="userstyle-textbox" type="text" placeholder="username" required></input>
            <input id="password" name="password" className="userstyle-textbox" type="text" placeholder="password" required></input>
            <input id="confirm_password" name="confirm_password" className="userstyle-textbox" type="text" placeholder="confirm password" required></input>
            <br></br>
            <div className="userstyle-subcontainer flex dirrow jend acenter">
              <p className="userstyle-link"> Already have an account? </p>
              <button className="userstyle-btn normal"> Register </button>
            </div>

            <>
              { InformText.map((value, key) => {
                  return(<p key={key}> {value} </p>);
              })
            }</>
          </form>
          
  
      
      
      
      </div>
    </div>



  );
}