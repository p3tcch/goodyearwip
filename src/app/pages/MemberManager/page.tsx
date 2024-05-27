'use client'
import "./membersmanager.css"
import fetchFunc from "@/app/scripts/FetchFunc";
import { useState, useEffect } from 'react';
import { ISoDateToDMY } from "@/app/scripts/DateConverter";
import Pagination from "@/app/components/Pagination/page";

export default function MemberManager() {

    const [users, setUsers] = useState([{
        created_at: "",
        lastest_extended_at: "",
        num: "",
        password: "",
        position: [],
        tag: "",
        username: ""
    }]);
    const [visibleUsers, setVisibleUsers] = useState(Array<Iuser>);

    interface Iuser {
        created_at: string,
        lastest_extended_at: string,
        num: string,
        password: string,
        position: [] | any,
        tag: string,
        username: string
    }


  

    const GetData = async () => {
        let result = await fetchFunc(process.env.API_ROUTE + "user/getall");
      
        if (result && result.length > 0) {
            let NewResult:Array<Iuser> = await result.map((element: { created_at: string, lastest_extended_at: string, num: string, password: string, position: string, tag: string, username: string }) => {
                return {
                    created_at: element.created_at, lastest_extended_at: element.lastest_extended_at, num: element.num, password: element.password, position: element.position.split(',').map((pos) => {
                        return pos;
                    }), tag: element.tag, username: element.username};
            });
            setUsers(NewResult)
            setVisibleUsers(NewResult)

        }

    }


    //Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [dataPerPage, setdataPerPage] = useState(10);

    const Test = async (cur:number)=> {
        setCurrentPage(cur);
    }
    



    useEffect(() => {
        GetData();
    }, []);


    const SearchMember = async (fromdata: FormData) => {
        let userMatchSearched:Array<Iuser> = [];
        let search:string | any = fromdata.get('searchtxt');
        users.map((user) => {
            let nameElement: string = search.toLowerCase();
            let pattern = `[a-zA-Z0-9 .]*`+ nameElement.toLowerCase() + `[a-zA-Z0-9 .]*`;
            let result = user.username.toLowerCase().match(pattern);
            if (result) {
                userMatchSearched.push(user);
            }
        })
        setVisibleUsers(userMatchSearched);
        
    }




    return (
        <div className="mm-container flex dircol acenter">

            <h1 className="mm-h1"> Members </h1>
            

            <form action={SearchMember} className='mm-search-container flex jend acenter'>
                <input type='text' id='searchtxt' name='searchtxt' className='mm-search-box'></input>
                <button className='mm-button search'> search </button>
            </form>


            {
                visibleUsers.length > 0 ? <Pagination prop={{dataLength: visibleUsers.length, dataPerPage: dataPerPage,currentPage: currentPage, Test}}/> : ''
            }
            
         
            <table>
                
                <thead>
                    <tr>
                        <th> no </th>
                        <th> user </th>
                        <th> created_at </th>
                        <th> lastest_extended </th>
                        <th> positions </th>
                        <th> tag </th>
                    </tr>
                </thead>
         
                <tbody>

                    <>
                        {visibleUsers.length > 0 ? visibleUsers.map((user, index) => {
                            
                            if(index >=  currentPage* dataPerPage && index < currentPage * dataPerPage +  dataPerPage){
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{user.username}</td>
                                        <td>{ISoDateToDMY(user.created_at)}</td>
                                        <td>{ISoDateToDMY(user.lastest_extended_at)}</td>
                                        <td>
                                            <>
                                            {user.position.map((pos:string | any, index:string | any) => <button key={"pos"+index} className="mm-button action"> {(pos)} </button>)}
                                            </>
                                        </td>
                                        <td>{user.tag}</td>
                                    </tr>
                                );
                            }
                            
                        }) : ""}
                    </>
                </tbody>
                
            </table>
            <>
                {visibleUsers.length > 0 ? "" : ". . . "}
            </>
            <br></br>
           
            
        </div>
    );
}