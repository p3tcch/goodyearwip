'use client';

import { useState, useEffect } from 'react';
import DataSetup from '@/app/scripts/DataSetup';
import fetchFunc from '@/app/scripts/FetchFunc';

import Pagination from '@/app/components/Pagination/page';
import Cookies from 'js-cookie';

import './filescategory.css';
import Link from 'next/link';
import Alert from '@/app/components/Alert/page';

export default function FilesCategory({ params }: { params: { position: string } }) {
    const [files, setFiles] = useState([{ num: '', name: '', url: '', created_at: '', position: '' }]);
    const [showFiles, setShowFiles] = useState([{ num: '', name: '', url: '', created_at: '', position: '' }]);
    const [loadingText, setLoadingText] = useState('Loading . . .');

    const GetFiles = async () => {

        let allFilesByPos: Array<{ num: string, name: string, url: string, created_at: string, position: string }> = [];

        const result = await fetchFunc(process.env.API_ROUTE + 'file/getbyposition', { position: params.position });
        allFilesByPos = result.excelfiles;

        if (allFilesByPos) {
            setFiles(allFilesByPos)
            setShowFiles(allFilesByPos);
            setLoadingText('');

        }
    }

    const [currentPage, setCurrentPage] = useState(0);
    const [dataPerPage, setdataPerPage] = useState(10);

    const Test = async (cur: number) => {
       
    }



    useEffect(() => {
        GetFiles();
    }, []); // Include params.position in dependency array to refetch data when it changes


    const SearchFile = (fromdata: FormData) => {

        let fileMatchSearched: Array<{ num: string, name: string, url: string, created_at: string, position: string }> = [];
        let search: string | any = fromdata.get('searchtxt');

        files.map((file) => {
            let nameElement: string = search.toLowerCase();
            let pattern = `[a-zA-Z0-9 .]*` + nameElement.toLowerCase() + `[a-zA-Z0-9 .]*`;
            let result = file.name.toLowerCase().match(pattern);
            if (result) {
                fileMatchSearched.push(file);
            }
        })
        setShowFiles(fileMatchSearched);
    }


    const [confirmAlert, setConfirmAlert] = useState("inactive");
    const [fileNameToDelete, setFileNameToDelete] = useState();
    const DeleteFile = (event: React.BaseSyntheticEvent) => {

        console.log(event.target.value);
        setFileNameToDelete(event.target.value);
        setConfirmAlert('awaitConfirmDelete');
    }

    const Confirmtmation = async (stats: string) => {
        if(stats === 'inactive') setConfirmAlert("inactive");
        if(stats === 'confirmed') {
            setConfirmAlert("inactive");
            let result = await fetchFunc(process.env.API_ROUTE + 'file/delete', {filename: fileNameToDelete, position: params.position })
            window.location.reload();
        }
        
      }

    return (
        <div className='filescategory-container flex acenter dircol'>
            <h1 className='filescategory-h1'> {params.position} </h1>
            <form action={SearchFile} className='filescategory-search-container flex jend acenter'>
                <input type='text' id='searchtxt' name='searchtxt' className='filescategory-search-box'></input>
                <button className='filescategory-search-btn'> search </button>
            </form>
            <>
                {showFiles.length > 0 ? <Pagination prop={{ dataLength: showFiles.length, dataPerPage: dataPerPage, currentPage: currentPage, Test }} /> : ''}
            </>
            <br></br>
            {loadingText == 'Loading . . .' ? loadingText :
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>no</th>
                                <th>filename</th>
                                <th>created_at</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {showFiles.map((value, key) => {

                                    return (
                                        <tr key={key}>
                                            <td> {key + 1} </td>
                                            <td> {value.name} </td>
                                            <td> {value.created_at} </td>
                                            <td>
                                                <div className='flex dirrow'>
                                                    <Link className="filescategory-button action view" href={`/pages/ViewExcelFile/${value.name}`} target="_blank"> View </Link>
                                                    <button className='filescategory-button action delete' onClick={DeleteFile} value={value.name}> Delete </button>
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                })}

                            </>
                        </tbody>
                    </table>
                    <br></br>
                    {showFiles.length === 0 ? 'No files was found.' : ''}

                    



                </>

            }


            <>
                {confirmAlert == 'awaitConfirmDelete' ?  <Alert prop={{txt:'Are you sure you want to delete this file?', Confirmtmation, cancelBtn: true}}/> : ''}
            </>


        </div>
    );
}
