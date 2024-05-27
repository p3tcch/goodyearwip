'use client'
import excelToJson from 'convert-excel-to-json';
import React, { useState, useEffect } from 'react';
import fetchFunc from '@/app/scripts/FetchFunc';

import './viewexcelfile.css';

import Pagination from '@/app/components/Pagination/page';

export default function ViewExcelFile({ params }: { params: { filename: string } }) {

    const [fileData, setFileData] = useState(Array<Array<Object>>);
    const [curFileData, setCurFileData] = useState(Array<Object>);

    const [fileObjectKey, setFileObjectKey] = useState(Array<string>);
    const [col, setCol] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
    
    const [curFileSheet , setCurrentFileSheet] = useState(0);

    //Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [dataPerPage, setdataPerPage] = useState(1000);

    const Start = async () => {
        let result = await fetchFunc(process.env.API_ROUTE + 'file/readfile', { filename: params.filename })
        if (result) {
            //console.log(result[Object.keys(result)[0]]);

            let array: any = [];
            Object.keys(result).map((sheet, index) => {
                array.push(result[Object.keys(result)[index]])
            })
            setFileData(array);
            setFileObjectKey(Object.keys(result));
            setCurFileData(array[0]);
           
        }




    }

    const Test = async (cur: number) => {
        setCurrentPage(cur);
      
    }

    const setCurrentSheet = async (event: React.BaseSyntheticEvent) => {
        let currentSheet = event.target.value;
        setCurrentFileSheet(currentSheet);
        setCurFileData(fileData[currentSheet]);
        setCurrentPage(0);
    }

    useEffect(() => {
        Start();


    }, []);

    useEffect(() => {
    }, [curFileData]);
   

    //console.log(fileData[0] ? fileData[0][1] : '');

    return (<div className='viewexcelfile-bg'>



        <br></br>
        <h1>{params.filename.split('%').join(" ")}</h1>
        <br></br>
        <>{ curFileSheet >= 0 ? 
            
        fileObjectKey.map((fileKey, index) => {
            if(curFileSheet == index) return (<button className='viewexcelfile-btn current' value={index} key={index} onClick={setCurrentSheet}> {fileKey} </button>)
            if(curFileSheet != index) return (<button className='viewexcelfile-btn' value={index} key={index} onClick={setCurrentSheet}> {fileKey} </button>)  
            
        }) : ''
    
        }</>
        
        <>
        {
            curFileData.length > 0 ? 
            <Pagination prop={{ dataLength: curFileData.length, dataPerPage: dataPerPage, currentPage: currentPage, Test }} />
            : ""
        }
        </>

        <br></br>
        <div className='viewexcelfile-table-container'>
            <table>
                <tbody>
                    <>
                        {  curFileData ? 
                                            curFileData.map((row: any, rowIndex: number) => {

                                                if(rowIndex < 1) {
                                                    return (
                                                        <tr key={rowIndex}>
                                                            {
                                                                col.map((col:any, colIndex:number) => {
                                                                    return <th key={colIndex}><p>  {row[col]} </p></th>
                                                                })
                                                            }
                                                        </tr>
                                                    )
                                                }
                                                //rowIndex >= 1 && 
                                                if (rowIndex >= 1 && rowIndex >= currentPage * dataPerPage && rowIndex <= currentPage * dataPerPage + dataPerPage) {
                                                    return (
                                                        <tr key={rowIndex}>
                                                            {
                                                                col.map((col:any, colIndex:number) => {
                                                                    return <td key={colIndex}><p>  {row[col]} </p></td>
                                                                })
                                                            }
                                                        </tr>
                                                    )
                                                }
                                            })
                            : ''
                        } 
                    </>
                </tbody>
            </table>





        </div>



    </div>);
}