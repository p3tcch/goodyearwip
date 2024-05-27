import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const res = await request.json();
    const { username, password, confirm_password } = res;

    let ValidationResult = await UserVerification({ username, password, confirm_password });

    if (ValidationResult.length > 0) return Response.json({ txts: ValidationResult });
    
    //Ready To Add
    const key:string | any = process.env.JWT_KEY;
    const defaultPermission = 'member';
    const token:string = jwt.sign({ username, position: defaultPermission}, key, { expiresIn: '24h' });


    return Response.json({ txts: ['Successfully register'], token});

}

const UserVerification = async (user: { username: string, password: string, confirm_password: string }) => {
    const { username, password, confirm_password } = user;
    let errors = [];

    if (username.length < 8 || username.length > 15) errors.push('Username must be between 8 - 15 characters.');
    const pattern = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
    let checkUsername = username.match(pattern);
    if (checkUsername === null) errors.push('Username cannot contains special characters.');

    if (password.length < 8 || password.length > 15) errors.push('Password must be between 8 - 15 characters.');
    let checkPassword = password.match(pattern);
    if (checkPassword === null) errors.push('Password cannot contains special characters.');

    if (password !== confirm_password) errors.push('Passwords must be matched each other.');

    if(errors.length > 0) return errors; 

    // Insert To Mysql
    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltRounds);
    const defaultPermission = "[]";
    const result: any = await MysqlQuery('INSERT INTO `users`(`username`, `password`, `position`) VALUES (?, ?, ?);', [username, passwordHashed, defaultPermission]);
    if (result.error)errors.push(result.error.code);


    return errors;
}
