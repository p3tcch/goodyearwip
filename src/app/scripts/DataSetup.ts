
export default async function DataSetup
    (
        getAllPositions: boolean = false,
        getAllFiles: boolean = false,
        getFilesByPositions: string = "",
        getAllHistories: boolean = false,
    ) 
    {
    
    let allPositionsArray:Array<{num: string, name:string, color: string}> = [];
    if(getAllPositions == true) {
        const result = await fetchFunc(process.env.API_ROUTE + 'position/getall');
        if(result.positions) allPositionsArray = result.positions;
    }
    let allFilesArray:Array<{num: string, name: string, url: string, created_at: string, position: string}>  = [];
    if(getAllFiles == true) {
        const result = await fetchFunc(process.env.API_ROUTE + 'file/getall');
        if(result.excelfiles) allFilesArray = result.excelfiles;
        
    }
    let allFilesByPos:Array<{num: string, name: string, url: string, created_at: string, position: string}> = [];
    if(getFilesByPositions != "") {
        const result = await fetchFunc(process.env.API_ROUTE + 'file/getbyposition', {position :getFilesByPositions} );
        allFilesByPos = result.excelfiles;
    }
    let allHistoriesArray:any = [];
    if(getAllHistories == true) {
        const result = await fetchFunc(process.env.API_ROUTE + 'history/getall');
        allHistoriesArray = result.histories;
    }

    



    console.log("Data Sutup Done");
    return {AllPos: allPositionsArray,AllFiles: allFilesArray,AllFilesByPos: allFilesByPos, allHistories : allHistoriesArray };
}

async function fetchFunc(url: string, object: Object = {}) {
    try {
       const res = await fetch(url, {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin':'*',
          },
          body: JSON.stringify(object),
       });
       const data = await res.json();
       if (data) {
          return data;
       };
    } catch (error) {
       console.error('Error fetching files:', error);
       return null;
    }
 }

