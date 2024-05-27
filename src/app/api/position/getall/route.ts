import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const res = await request.json();

    const result:any = await MysqlQuery("SELECT * FROM `position`;", []);
    if(result.error) return Response.json({txts: ['result.error.code']});
    if(!result[0]) return Response.json({txts: ['There is no position']});
    return Response.json({txts: ['Successfully Query'], positions: result });
}