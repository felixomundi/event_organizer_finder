const getTimestamp = () =>{
    const dateString  = new Date().toLocaleString("en-us", {timeZone: "Africa/Nairobi"})
    const date = new Date(dateString); 
    const TIME_STAMP = date.getFullYear()+ 
            ("0" + (date.getMonth() + 1)).slice(-2) + 
            ("0" + (date.getDate() + 1)).slice(-2) + 
            ("0" + (date.getHours() + 1)).slice(-2) + 
            ("0" + (date.getMinutes() + 1)).slice(-2) + 
            ("0" + (date.getSeconds() + 1)).slice(-2); 
            return TIME_STAMP;
}

module.exports = getTimestamp