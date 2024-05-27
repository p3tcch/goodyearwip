'use client'
import LeftTab from "./components/LeftTab/page";
import Header from "./components/Header/page";
import Notification from "./components/Notification/page";
import SectionOne from "./components/SectionOne/page";
import Banner from "./components/Banner/page";
import Graph from "./components/Graph/page";

import "./mainpage.css";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';


export default function Home() {

  const [userData, setUserData] = useState({ username: '', positions: [''] })


  const TokenDecoded = async (token: string) => {
    try {
      const key: string | any = process.env.JWT_KEY;
      let decoded: { username: string, positions: string, iat: number, exp: number } | any = await jwt.decode(token, key);
      if (!decoded.username) throw new Error;
      return { username: decoded.username, positions: decoded.position };
    } catch (error) {
      return null;
    }
  }
  const GetPositionFromUser = async () => {
    const token: string | any = Cookies.get('token');
    const user: string | any = await TokenDecoded(token);
    if (user) {
      let userPosition: Array<string> = user.positions.split(',');
      setUserData({ username: user.username, positions: userPosition })
    }

  }

  

  useEffect(() => {
    GetPositionFromUser();
   
  }, []);


  return (
    <div >


      <LeftTab />
      <Header />
      <div className="mp-container">
          <SectionOne/>
        <div className="flex acenter jcenter dirrow wrap">
          <Graph />
          <Notification />
        </div>



      </div>

    </div>
  );
}

