import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        let result:any = await MysqlQuery("SELECT * FROM `history`;", []);
        let histories = result;
        return Response.json({ txt:['Successfully create history'], histories});
    } 
    catch(err) {
        console.error(err);
        return Response.json({txt:['some thing went wrong']});
    }
    
    
}