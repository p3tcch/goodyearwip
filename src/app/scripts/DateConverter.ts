

export default function DateConverter(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDay();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
 
    return `${year}-${month}-${day}`;

      
}
export function ISoDateToDMY(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    let newMinutes = '';
    if(minute < 10) newMinutes = '0'+minute;
    if(minute > 10) newMinutes = minute.toString();
    return `${day}/${month}/${year} ${hour}:${newMinutes}`; 
}
export function ISoDateToOnlyDMY(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; 
}
export function ISoDateToOnlyYMD(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth()+1;
    let newMonth = '';
    if(month < 10) newMonth = '0' + month;
    const year = date.getFullYear();
    return `${year}/${newMonth}/${day}`; 
}
export function ISoDateToOnlyHours(isoDate: string) {
    const date = new Date(isoDate);
    const hour = date.getHours();
    const minute = date.getMinutes();
    let newMinutes = '';
    if(minute < 10) newMinutes = '0'+minute;
    if(minute > 10) newMinutes = minute.toString();
    return `${hour}:${newMinutes}`; 
}