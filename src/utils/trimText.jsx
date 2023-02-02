export function trimForm(data){
    Object.keys(data).forEach(key => {
        if (typeof (data[key]) === 'string') {
            data[key] = (data[key]).trimStart();
            data[key] = (data[key]).trimEnd();
        }
    });
    return data;
}
export function trimSingleText(data){
    
        if (typeof (data) === 'string') {
            data = (data).trimStart();
            data = (data).trimEnd();
        }
    return data;
}