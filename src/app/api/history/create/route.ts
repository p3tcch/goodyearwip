import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const res = await request.json();
    const { filename, type , position } = res;
    console.log(filename, type);

    try {
        let result:any = await MysqlQuery("INSERT INTO `history`(`file_name`,`action_type`,`file_position`) VALUES (?,?,?);", [filename, type, position]);
    } 
    catch(err) {
        console.error(err);
        return Response.json({txt:['some thing went wrong']});
    }
    
    return Response.json({ txt:['Successfully create history'] });
}