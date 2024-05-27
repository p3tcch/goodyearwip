import { join } from 'path';
import { writeFile } from "fs/promises";
import MysqlQuery from '@/app/scripts/MysqlQuery';


export async function POST(request: Request) {

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const positions:string | any = data.get('positions');
    if (!file) return Response.json({ txts: ['no files'] });
   

    const acceptFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if(file.type !== acceptFileType) return Response.json({ txts: ['Unacceptable file type.'] });
    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);
    const date = new Date().getTime();
    
    let filename = file.name.split('.');
    let newFileName = filename[0]+date+'.'+filename[1];
    newFileName = newFileName.split(' ').join('');

    const path = join(process.env.STORAGE_EXCEL_FILES as string, newFileName);
    await writeFile(path, buffer);
    const filePath:string = process.env.STORAGE_EXCEL_FILES as string;
    try {
        const result:any = await MysqlQuery("INSERT INTO `excelfiles`(`name`, `url`,`position`) VALUES (?,?,?);", [newFileName, filePath+newFileName, positions]);    
        if(result.error) return Response.json({txts: [result.error.code]});

    } catch (err) {
        console.error("api/upload/route.ts [error] : " + err);
    }
    
    let result = await fetchFunc(process.env.API_ROUTE + '/history/create', {filename: newFileName, type: 'create', position: positions});

    return Response.json({ txts: ['Upload Successfully'] });
   
}
async function fetchFunc(url: string, object: Object = {}) {
    try {
       const res = await fetch(url, {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
          },
          body: JSON.stringify(object),
       });
    } catch (error) {
       console.error('Error fetching files:', error);
    }
 }
