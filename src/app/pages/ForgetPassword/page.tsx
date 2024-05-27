'use client'

import "../userstyle.css";
import "./forgetpassword.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function ForgetPassword() {

  const router = useRouter();

  const [InformText, SetInformText] = useState(['', '']);

  async function FetchForgetPassword(url: string, user: Object) {
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

  const GetUser = async (formdata: FormData) => {
    let username = formdata.get('username');
    let result = await FetchForgetPassword(process.env.API_ROUTE + 'user/forgetpassword' ,{username});
    SetInformText(result.txts);

    setTimeout(() => {
      router.push('/', { scroll: false });
    }, 2000);
  }
 
  useEffect(() => {
   
  }, []);


  return (

    <div>
      <div className="userstyle-body flex jcenter acenter">


        <form action={GetUser} className="userstyle-container flex jcenter acenter dircol">
          <h1> Forgot Password </h1>
          <br>
          </br>
         
          <input id="username" name="username" className="userstyle-textbox" type="text" placeholder="username" required></input>
          <br></br>
          <div className="userstyle-subcontainer flex dirrow jend aend">
              <p className="userstyle-link">  </p>
              <button className="userstyle-btn"> Forgot Password </button>
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