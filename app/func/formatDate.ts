export const showDate = (data:Date):string => {
    const date:string = String(data.getDate()).padStart(2, '0');
    const month:string = String(data.getMonth() + 1).padStart(2, '0');
    const year:number = data.getFullYear();
    return `${date}/${month}/${year}`;
}