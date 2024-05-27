
'use client'
import "./notification.css"
import DataSetup from "@/app/scripts/DataSetup";
import { ISoDateToDMY } from "@/app/scripts/DateConverter";
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Notification() {
    
    const [histories, setHistories] = useState([{action_type: "",created_at: "",file_name: "",num: "", file_position: ""}]);

  const GetHistory = async () => {
    let data = await DataSetup(false, false, "", true);
    if(data.allHistories.length > 0) {
      setHistories(data.allHistories);
    }
  }
  useEffect(() => {
    GetHistory();
  }, []);
  



  
  return (
      <div className="notification-box flex jcenter acenter dircol">
        <br></br>
          <div className="flex dirrow jend aend">
              <h2 className="notification-header-text">History</h2>
              <Link className="notification-btn-viewall" href="/pages/History"> ViewAll </Link>
          </div>
          <br></br>
            <>
              <div className="notification-sub-box flex  dircol">
              
             
              <>
                  { histories[0].file_name !== "" ?
                histories.map((value, index) => {
                return(
                  <div key={index} className="flex acenter">
                    <button className="notification-sign posiotion">{value.file_position} </button>
                    <button className={`notification-sign ${value.action_type === "create" ? "create" : "delete"}`}> {value.action_type} </button>
                    <p className="notification-text">{value.file_name} </p>
                    <p className="notification-text date">&nbsp; {ISoDateToDMY(value.created_at)} </p> 
                  </div>
                  )
                }) : "Loading . . ."
                } 
              </> 
              

              </div>
              
            
            </>
      </div>
    );
  }