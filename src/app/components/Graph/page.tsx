'use client'
import "./graph.css"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, scales, } from 'chart.js/auto';
import { Line, Bar, Doughnut, Radar, Pie, Bubble } from 'react-chartjs-2'

import { useState, useEffect } from 'react';

import { TokenDecoded } from '../../scripts/UserCookieDecoded';
import Cookies from "js-cookie";

import DataSetup from "@/app/scripts/DataSetup";

export default function Graph() {

   const [graphData, setGraphData] = useState([]);
   const [graphColor,setGraphColor] = useState(['']);


   ChartJS.register();
   
  
   const GetData = async () => {
      try{
         let AllData = await DataSetup(true, true);
         let testfiles:Array<{ num: string, name: string, url: string, created_at: string, position: string }> = AllData.AllFiles;
         let allposArray: Array<string> = [];
         let allposColorArray: Array<string>  = [];
         AllData.AllPos.map((value: { num: string, name: string , color: string}) => {
               allposArray.push(value.name);
         })
         let array: any = [];
         allposArray.map((pos, index) => {
            array.push({ name: pos, amount: testfiles.filter(file => file.position === allposArray[index]).length })
         });
         let token:string | any = Cookies.get('token');
         let userpos = await TokenDecoded(token);
         let userPosArray:Array<string> = [];
         userpos?.positions.map((position:string) => {
            if(position !== 'admin') {
               userPosArray.push(position);
            } else {
               userPosArray.push(...allposArray);
            }
         })
         let testarray:any = [];
         array.map((value:{name:string, amount:number, color: string}) => {
            userPosArray.map((userpos: string) => {
               if(value.name === userpos) {
                  testarray.push(value);
               };
            })
         });
         
         let colors:Array<string> = [];
         let test = testarray.map((value:{name: string, amount: string}) => {
            AllData.AllPos.map((allpos: { num: string, name: string , color: string}) => {
               if(allpos.name === value.name) colors.push(allpos.color);
            })
         });
         setGraphColor(colors);
         setGraphData(testarray);
      } catch(errors) {
         console.log(errors);
      }
      
   }



   useEffect(() => {
      GetData();


   }, []);


   const data: any = {
      labels: 
         graphData.map((value: { name: string, amount: number }) => value.name)
      ,
      
      datasets: [{
         label: 'Files',
         data: graphData.map((value: { name: string, amount: number }) => value.amount),
         fill: true,
         backgroundColor: graphColor,
         borderColor: graphColor,
         pointBackgroundColor: 'rgb(255, 99, 132)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
   };



   return (
     
         <div className="graph-box flex acenter dircol">
             <br></br>
                  <h2 className="graph-h2"> Excel files  </h2>
             
               <br></br>
            <div className='graph-graph flex dircol flex jcenter'>
               
               
               { graphData.length > 0 ? <Pie data={data}></Pie> : <p className="graph-inform-text">Login to see Data</p>}
            </div>
         </div>
   
   );
}