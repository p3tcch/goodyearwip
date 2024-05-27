import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        const result:any = await MysqlQuery("SELECT * FROM `excelfiles`", []); 
        if(result.error) return Response.json({txts: ['result.error.code']});

        return Response.json({excelfiles: result});
    } catch(err) {
        return Response.json({txts: ['errors']});
    }
}