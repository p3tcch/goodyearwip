
import excelToJson from "convert-excel-to-json";
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
    const res = await request.json();
    const { filename } = res;

    try {
        //"Project 20241712480118742.xlsx"
    const result:any = await excelToJson({
        sourceFile: process.env.STORAGE_EXCEL_FILES + filename.split('%').join(" "),
    });
        //console.log(Object.keys(result));
        return Response.json(result);
    } catch(err) {
        console.log(err);
        return Response.json(null);
    }
}

// export async function POST(request: Request) {
//     const res = await request.json();
//     const { filename } = res;

//     try {

//         const filePath = '@/app/api/file/readfile/Project2024(1)1713690677492.xlsx';
//         const workbook = XLSX.readFile(filePath);
//         const sheetNames = workbook.SheetNames;

//         // Object to store data from all sheets
//         const data: { [key: string]: any[] } = {};

//         // Iterate through each sheet and extract data
//         sheetNames.forEach(sheetName => {
//             const sheet = workbook.Sheets[sheetName];
//             const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//             data[sheetName] = jsonData;
//         });

//         console.log(data);
//         return Response.json({ sheets: data });
//     } catch(err) {
//         console.log(err);
//         return Response.json(null);
//     }
// }