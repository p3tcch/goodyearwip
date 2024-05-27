
'use client'

import './pagination.css';
import React, { useState, useEffect } from 'react';

export default function Pagination({ prop }: { prop: {dataLength:number,dataPerPage:number, currentPage:number,Test(cur:number,pageLength: number):any}} | any) {

    
    const [Pages, setPages] = useState(Array<number>);
    const Start = () => {
        let allPages: number = Math.floor(prop.dataLength / prop.dataPerPage);
        let fraction = prop.dataLength % prop.dataPerPage;
        if(fraction > 0) allPages++;
        if (allPages > 0) {

            let intArrayMap: Array<number> = [];
            for (let i = 0; i < allPages; i++) {
                intArrayMap.push(i);
            }
            setPages(intArrayMap);
            
        }


    }

    const GoToPage = async (event:React.BaseSyntheticEvent) => {
        await prop.Test(event.target.value, Pages.length);
        Start();
    }
    useEffect(() => {
        Start();
    }, []);

    useEffect(() => {
        Start();
    }, [prop.dataLength]);

    return (

        <div className="flex jcenter acenter dirrow">
           <>
              
           {
             
                    Pages.map((page, index) => {
                    
                    
                            if(
                                index-1 == prop.currentPage || 
                                index-2 == prop.currentPage ||
                                index == prop.currentPage || 
                                index+1 == prop.currentPage ||
                                index+2 == prop.currentPage
                            ) {
                                if(index != prop.currentPage) 
                                    return <button key={index} className="pagination-button nav" onClick={GoToPage} value={page}> {page+1} </button>
                                if(index == prop.currentPage) 
                                    return <button key={index} className="pagination-button nav current"> {page+1} </button>
                            }
                            if(index === 0) return <button key={index} className="pagination-button nav" onClick={GoToPage} value={page}> {page+1} </button>
                            if(index+1 === Pages.length) return <button key={index} className="pagination-button nav" onClick={GoToPage} value={page}> {page+1} </button>
                        
                    })
            }
           </>


        </div>
    );
}