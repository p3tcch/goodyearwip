'use client'
import "./lefttab.css"

import Link from 'next/link';
import { TokenDecoded } from '../../scripts/UserCookieDecoded';
import Cookies from 'js-cookie';
import { useState , useEffect } from 'react';

export default function LeftTab() {
  
  const [isAdmin, setIsAdmin] = useState(false);
  
  const Start = async () => {
    let token: string | any = Cookies.get('token');
    if(!token) return;
    let user: { username: string, positions: Array<string> } | null  = await TokenDecoded(token);
    if(user) {
      user.positions.filter((pos) => pos === "admin").length > 0 ? setIsAdmin(true):  setIsAdmin(false);
    }
  }  
  useEffect(() => {
    Start();
  }, []);
  
  
  return (
      <div className="lefttab-container flex acenter dircol">
        
        {
          isAdmin == true ? 
          <>
            <Link className="lefttab-link" href="/pages/Files/Upload"> Upload Excel File </Link>
            <Link className="lefttab-link" href="/pages/MemberManager"> Member </Link>
            <p className="lefttab-link"> Add new Postion </p>
          </>
        : ''}
      
      </div>
    );
  }