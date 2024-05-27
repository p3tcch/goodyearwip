'use client'

import "../userstyle.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "@/app/components/Header/page";

export default function Login() {



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

    const username:string | any = formdata.get('username');
    const oldPassword: string | any = formdata.get('oldPassword');
    const newPassword: string | any = formdata.get('newPassword');
  

    const result = await FetchLogin(process.env.API_ROUTE + 'user/changepassword', { username ,oldPassword, newPassword});
    if(result.txts) SetInformText(result.txts);
   
  }


  return (

    <div>
     <Header/>
      <div className="userstyle-body flex jcenter acenter">
      

        <form action={GetUser} className="userstyle-container flex jcenter acenter dircol">
          <h1> Change Password </h1>
          <br>
          </br>
          <input id="username" name="username" className="userstyle-textbox" type="text" placeholder="username" required></input>
          <input id="oldPassword" name="oldPassword" className="userstyle-textbox" type="text" placeholder="old Password" required></input>
          <input id="newPassword" name="newPassword" className="userstyle-textbox" type="text" placeholder="New Password" required></input>
          <br></br>
          <div className="userstyle-subcontainer flex dirrow jend acenter">
              <p className="userstyle-link">  </p>
              <button className="userstyle-btn"> ChangePassword </button>
            </div>

            <div className="flex dircol">
            {InformText.map((value, key) => {
              return (<p key={key}> {value} </p>);
            })
            }
          </div>
        </form>




      </div>
    </div>



  );
}