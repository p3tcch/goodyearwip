'use client'

import "./header.css";
import Link from 'next/link';

import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react';
import Alert from "../Alert/page";
import { TokenDecoded } from "@/app/scripts/UserCookieDecoded";

export default function Header() {

  const [UserLoggined, setUserLoggined] = useState(false);
  const [user, setUser] = useState({username: 'Guest', positions: ['']});
  const router = useRouter();
  const [confirmAlert, setConfirmAlert] = useState('inactive');
  
  const Logout = () => {
    Cookies.remove('token');
    Cookies.remove('userexpire');
    Cookies.remove('username');
    window.location.reload();
  }


  const GetUserCookie = async (token: string) => {
    let user: { username: string, positions: Array<string> } | null  = await TokenDecoded(token);
    if(user) {
      setUser(user)
      Cookies.set('username', user.username);
    }
  
  }
 

  useEffect(() => {
    let token: string | any = Cookies.get('token');
    let userexpire: string | any = Cookies.get('userexpire');
    if (token) {
      GetUserCookie(token);
      setUserLoggined(true);
    };
    if(userexpire) {
      if(userexpire == "nearly") setConfirmAlert("awaitConfirmNearly");
      if(userexpire == "expired") setConfirmAlert("awaitConfirmExpired");
      Cookies.remove('userexpire');
    }




  }, []);

 
  const Confirmtmation = async () => {
    setConfirmAlert("inactive");
  }

  return (
    <div className="header-container flex jend acenter dirrow">
      { confirmAlert === 'awaitConfirmNearly' ? <Alert prop={{txt: 'User Nearly Expired, Please change your password before it is expire.', Confirmtmation, cancelBtn: false}}/> : ''}
      { confirmAlert === 'awaitConfirmExpired' ? <Alert prop={{txt: 'User Expire. Please contact an admin to reset your password.', Confirmtmation, cancelBtn: false}}/> : ''}
      <p className="header-usertxt"> Welcome { user.username }</p>
      <Link className="header-link" href="/"> Home </Link>
      <Link className="header-link" href="/pages/ChangePassword"> Change Password </Link>
      {
        UserLoggined == false ? <Link className="header-link" href="/pages/Login"> Login </Link> : ''
      }
      {
        UserLoggined == false ? <Link className="header-link" href="/pages/Register"> Register </Link> : ''
      }
      {
        UserLoggined == true ? <p className="header-link" onClick={Logout}> Logout </p> : ''
      }










    </div>
  );
}