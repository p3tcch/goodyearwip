'use client'

import './alert.css';
import { useState, useEffect } from 'react';

export default function Alert({prop}: { prop:{txt: string | any, Confirmtmation(stats:string):any,cancelBtn:boolean }} | any) {

   
    const [visible, setVisible] = useState(true);
    const [txt, setTxt] = useState('');
    const [cancelBtnState, setCancelBtnState] = useState(false);

    const Submit = () => {
        setVisible(false);
        prop.Confirmtmation("confirmed");

    }
    const Cancel = () => {
        setVisible(false);
        prop.Confirmtmation("inactive");
    }

    useEffect(() => {
        setTxt(prop.txt);
        setCancelBtnState(prop.cancelBtn);
    }, []);

    return (

        <div>
            {visible === true ?
                <div className="alert-bg flex jcenter acenter">
                    <div className="alert-container">
                    {txt? prop.txt : ''}
                    <br></br>
                    <br></br>
                   
                    <div className='alert-subcontainer flex jend'>
                        <button className='alert-btn' onClick={Submit}> Ok </button>
                        {cancelBtnState == true ? <button className='alert-btn cancel' onClick={Cancel}> Cancel </button> : ''}
                    </div>
                </div>
                </div>
                : ''
            }  
        </div>
    );
}