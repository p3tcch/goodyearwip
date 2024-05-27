import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DateConverter from "@/app/scripts/DateConverter";
import {ISoDateToDMY} from "@/app/scripts/DateConverter";

export async function POST(request: Request) {
    const res = await request.json();
    const { username, password } = res;
    
    const pattern = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
    let checkUsername = username.match(pattern);
    if (checkUsername === null) return Response.json({txts: ['User not found']});

    const result:any = await MysqlQuery("SELECT * FROM `users` WHERE `username` = ?;", [username]);    
    if(result.error) return Response.json({txts: [result.error.code]});
    if(!result[0]) return Response.json({txts: ['User not found']});

    const match = await bcrypt.compare(password, result[0].password);
    if(!match) return Response.json({txts: ['Password incorrect']});

    const registerDate = new Date(result[0].lastest_extended_at);
    const today = new Date(Date.now());
    
    const registerDateThai = registerDate.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });
    const todayThai = today.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });
    
    const userExp = 86400000 * 6;
    const nearlyExp = 86400000 * 5 // 5 days;

    //console.log((registerDate.getTime() + userExp) - today.getTime(), nearlyExp);
    //Expired
    if((registerDate.getTime() + userExp) - today.getTime() <= 0) {
        return Response.json({txts: ['User expired'], expire: 'expired'});
    }
    const key:string | any = process.env.JWT_KEY;
    const token:string = jwt.sign({ username, position: result[0].position}, key, { expiresIn: '24h' });
    //Nearly Expired
    if((registerDate.getTime() + userExp) - today.getTime() <= nearlyExp) {
        return Response.json({txts: ['Successfully Logined'], token, expire: 'nearly'});
    }
    //Normal
    return Response.json({txts: ['Successfully Logined'], token});

}

