import MysqlQuery from "@/app/scripts/MysqlQuery";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { unlink } from "fs/promises";
import fetchFunc from '@/app/scripts/FetchFunc';
export async function POST(request: Request) {

    const res = await request.json();
    const { filename, position } = res;


    try {
        const result:any = await MysqlQuery("DELETE FROM `excelfiles` WHERE `name` = ?", [filename]); 
        if(result.error) return Response.json({txts: ['result.error.code']});

        const path = process.env.STORAGE_EXCEL_FILES+filename;
        unlink(path);

        let historydelete = await fetchFunc(process.env.API_ROUTE + '/history/create', {filename: filename, type: 'delete', position: position});

        return Response.json({txts: ['delete file successfilly']});
    } catch(err) {
        return Response.json({txts: ['errors']});
    }
}