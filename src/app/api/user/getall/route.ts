import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DateConverter from "@/app/scripts/DateConverter";
import {ISoDateToDMY} from "@/app/scripts/DateConverter";
 


export async function POST(request: Request) {
    const res = await request.json();
   
    try {
        let result = await MysqlQuery("SELECT * FROM `users`;", []); 
        if(result) return Response.json(result);
    } catch (err) {
        return Response.json({txts: ['Something went wrong']});
    }
    
    
    return Response.json({txts: ['Successfully Logined']});

}