'use client'

import "../userstyle.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

import Header from "@/app/components/Header/page";

export default function Login() {
  
  const router = useRouter();


  async function FetchLogin(url: string, user: Object) {
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

  const [InformText, SetInformText] = useState(['', '']);

  const GetUser = async (formdata: FormData) => {

    const username: string | any = formdata.get('username');
    const password: string | any = formdata.get('password');

    const result = await FetchLogin(process.env.API_ROUTE + 'user/login', { username, password });
    if(result.txts) SetInformText(result.txts);
    
    
    
    if(result.expire)  {
      Cookies.set('userexpire', result.expire);
      ForceBack();
    };
    if(result.token) {
      Cookies.set('token', result.token);
      ForceBack();
    } 
    
  }

  const ForceBack = () => {
    setTimeout(() => {
      router.push('/', { scroll: false });
    }, 1000);
  }


  return (
    
    <div>
      <Header/>
      <div className="userstyle-body flex jcenter acenter">


        <form action={GetUser} className="userstyle-container flex jcenter acenter dircol">
          <h1> Login </h1>
          <br>
          </br>
          <input id="username" name="username" className="userstyle-textbox" type="text" placeholder="username" required></input>
          <input id="password" name="password" className="userstyle-textbox" type="text" placeholder="password" required></input>
          <div className="userstyle-subcontainer flex dirrow jend acenter">
            <p className="userstyle-link"> Forget Password ? </p>
            <button className="userstyle-btn normal"> Login </button>
          </div>
          <>
            {InformText.map((value, key) => {
              return (<p key={key}> {value} </p>);
            })
            }
          </>



        </form>




      </div>
    </div>



  );
}