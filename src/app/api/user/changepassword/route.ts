import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const res = await request.json();
    const { username, oldPassword, newPassword } = res;

    let errors = await UserVerification({ username, oldPassword, newPassword });
    if(errors.length > 0)  return Response.json({txts: [errors] });
    //Insert To Mysql
    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(newPassword, saltRounds);
    const result: any = await MysqlQuery('UPDATE `users` SET `password`= ?,`lastest_extended_at`= CURRENT_TIMESTAMP(),`tag`="" WHERE `username` = ?;', [passwordHashed, username]);
    if (result.error) Response.json({txts: [result.error] });

    return Response.json({txts: ['Successfully Change Password'] });
 
}
const UserVerification = async (user: { username: string, oldPassword: string, newPassword: string }) => {
    const { username, oldPassword, newPassword } = user;
    let errors = [];
    console.log(username, oldPassword, newPassword);
    const result:any = await MysqlQuery("SELECT * FROM `users` WHERE `username` = ?;", [username]);    
    if(result.error) errors.push(result.error.code);
    if(!result[0]) {
        errors.push('User not found');
        return errors;
    }
    const match = await bcrypt.compare(oldPassword, result[0].password);
    if(!match) errors.push('oldPassword incorrect');

    const pattern = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
    if (newPassword.length < 8 || newPassword.length > 15) errors.push('Password must be between 8 - 15 characters.');
    if(oldPassword === newPassword) errors.push('Password cannot be the same as the old one.');
    let checkPassword = newPassword.match(pattern);
    if (checkPassword === null) errors.push('Password cannot contains special characters.');
    return errors;
}