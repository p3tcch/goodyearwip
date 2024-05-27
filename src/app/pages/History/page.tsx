'use client'

import './history.css'
import { useState, useEffect, BaseSyntheticEvent } from 'react';
import DataSetup from "@/app/scripts/DataSetup";
import { ISoDateToOnlyDMY, ISoDateToOnlyHours, ISoDateToOnlyYMD } from "@/app/scripts/DateConverter";
import Header from '@/app/components/Header/page';


export default function History() {

    const [searchDate, setSearchDate] = useState('');
    const [AllPos, setAllPos] = useState([{ num: "", name: "", color: "" }])
    const [searchPos, setSearchPos] = useState('All');
    const [histories, setHistories] = useState([{ action_type: "", created_at: "", file_name: "", num: "", file_position: "" }]);
    const [visibleHistory, setVisibleHistory] = useState([{ action_type: "", created_at: "", file_name: "", num: "", file_position: "" }]);


    const GetHistory = async () => {
        let data = await DataSetup(true, false, "", true);
        if (data.AllPos.length > 0) setAllPos(data.AllPos);
        if (data.allHistories.length > 0) {
            setHistories(data.allHistories);
            setVisibleHistory(data.allHistories);

        }
    }

    const getDateFromSearch = (event: BaseSyntheticEvent) => {
        let date: string | any = event.target.value.replaceAll('-', '/');
        setSearchDate(date);
    }
    const SearchByPosition = (event: BaseSyntheticEvent) => {
        setSearchPos(event.target.value);
    }


    useEffect(() => {
        GetHistory();
    }, []);

    useEffect(() => {
        let result: Array<{ action_type: string, created_at: string, file_name: string, num: string, file_position: string }> = [];
        if (searchPos != 'All') {
            result = histories.filter((history, index) => history.file_position == searchPos);
        } else {
            result = histories;
        }
        if (searchDate != '') {
            result = result.filter((history, index) => ISoDateToOnlyYMD(history.created_at) == searchDate);
        }

        setVisibleHistory(result);



    }, [searchPos, searchDate]);



    return (

        <div>
            <Header />
            <div className='flex jcenter'>


                <div className='history-container'>
                    <br></br>  <br></br>  <br></br>
                    <div className='flex dirrow'>
                        <div className='history-sub-container'>
                            {searchPos == 'All' ? <button className='history-btn position' value={'All'} onClick={SearchByPosition}> All </button>
                                : <button className='history-btn position active' value={'All'} onClick={SearchByPosition}> All </button>}
                            <>
                                {AllPos.map((pos, index) => {
                                    return pos.name == searchPos ? <button key={index} className='history-btn position' value={pos.name} onClick={SearchByPosition}> {pos.name} </button>
                                        : <button key={index} className='history-btn position active' value={pos.name} onClick={SearchByPosition}> {pos.name} </button>;
                                })}
                            </>


                        </div>
                        <div className='history-sub-container flex jend'>
                            <input type="date" onChange={getDateFromSearch}></input>
                        </div>
                    </div>
                    <br></br>
                    <div className='flex jcenter'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='td action'> </th>
                                    <th className='td name'>  </th>
                                    <th className='td date'>  </th>
                                    <th className='td hour'>  </th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {
                                        histories[0].file_name !== '' ? 
                                        visibleHistory.map((history, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='td action'>
                                                        <div className='flex dirrow'>
                                                            {searchPos == 'All' ? <button className="history-sign position">{history.file_position} </button> : ''}
                                                            <button className={`history-sign ${history.action_type === "create" ? "create" : "delete"}`}> {history.action_type} </button>
                                                        </div>
                                                    </td>
                                                    <td className='td name'><p className='history-div-name'>{history.file_name}</p></td>
                                                    <td className='td date'><p className='txt start'> {ISoDateToOnlyYMD(history.created_at)} </p></td>
                                                    <td className='td hour'><p className='history-hour'>{ISoDateToOnlyHours(history.created_at)} </p></td>
                                                </tr>
                                            );
                                        }): ''
                                    }
                                </>
                            </tbody>
                        </table>
                    </div>




                </div>
            </div>
        </div>
    );
}