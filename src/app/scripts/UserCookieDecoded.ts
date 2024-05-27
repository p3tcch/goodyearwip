import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export  function UserVaridation (request: NextRequest) {
    try {
        let cookie: string | any = request.cookies.get('token');
        const key: string | any = process.env.JWT_KEY;
        let decoded:{username: string,position: string,iat: number,exp: number} | any = jwt.decode(cookie.value, key);
        if(!decoded.username) throw new Error;
        return { username: decoded.username, position: decoded.position };
    } catch (error) {
        return null;
    }
}
export async function TokenDecoded (token: string) {

    try {
  
      const key: string | any = process.env.JWT_KEY;
      let decoded: { username: string, position: string, iat: number, exp: number } | any = await jwt.decode(token, key);
      if (!decoded) throw new Error;

      let userPositions:Array<string> = decoded.position.split(',');

      return { username: decoded.username, positions: userPositions };
    } catch (error) {
      return null;
    }
  }
