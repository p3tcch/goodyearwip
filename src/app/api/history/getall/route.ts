import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        let result:any = await MysqlQuery("SELECT * FROM `history`;", []);
        return Response.json({ txt:['Successfully create history'], histories: result});
    } 
    catch(err) {
        console.error(err);
        return Response.json({txt:['some thing went wrong']});
    }
    
    
}