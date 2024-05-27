import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DateConverter from "@/app/scripts/DateConverter";

export async function POST(request: Request) {
    const res = await request.json();
    const { username } = res;

    try{
        const result:any = await MysqlQuery("UPDATE `users` SET `tag`='forget' WHERE `username` = ?", [username]);
        if(result.error) return Response.json({txts: [result.error.code]});
    }
    catch(err){
        console.error('api/user/forgetpassword/route.ts [error] : ' + err);
    }



    return Response.json({txts: ['Successfully submitted request']});

}