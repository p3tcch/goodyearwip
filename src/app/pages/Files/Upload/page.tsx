'use client';
import './filesupload.css';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import DataSetup from '@/app/scripts/DataSetup';

export default function FileUpload() {
  
  const router = useRouter();


 
  const [file, setFile] = useState<File>();
  const [positions, setPositions] = useState([{ num: '', name: '', color: '' }]);
  const [sebmitPosition, setSubmitPosition] = useState('');
  const [InformText, SetInformText] = useState(['', '']); 

  const onSubmit = async (event: any) => {
    
    if(!file) return;
    try{
      const data = new FormData();
      data.set('file', file);
      data.set('positions', sebmitPosition);
      const res = await fetch(process.env.API_ROUTE + '/file/upload', {
        method: 'POST',
        body: data,
      })
      if(!res.ok) throw new Error(await res.text());
      const result = await res.json();
      if(result.txts) SetInformText(result.txts);
    
      location.reload();
     
    } 
    catch(error:any) {
      console.log(error);
    }

  }

    const SetPositions = async() => {
      let result = await DataSetup(true,true);
      console.log(result);
      if(result.AllPos) setPositions(result.AllPos);
    }
    const GetPosition = (event: React.BaseSyntheticEvent) => {
      setSubmitPosition(event.target.value);
    }

    useEffect(() => {
      SetPositions();
    }, []);

  return (
    <div className="flex jcenter acenter dircol">
       
        <h1> File Upload </h1>

        <form action={onSubmit}>
            <input
              id="file" 
              name="file"
              type="file"
              onChange={(event ) => {setFile(event.target.files?.[0])}} required></input>
              position : <select id="positions" name="position" onChange={GetPosition} required>
              <option value=''> </option>
                <>
                {
                  positions.map((value,  key) => {
                    return <option key={key} value={value.name}> {value.name} </option>
                  })

                }
                </>
            </select>
              &nbsp;
              <button className="filesupload-btn" value="submit"> upload </button>
        </form>
        <>
            {InformText.map((value, key) => {
              return (<p key={key}> {value} </p>);
            })
            }
          </>
    </div>
  );
}
