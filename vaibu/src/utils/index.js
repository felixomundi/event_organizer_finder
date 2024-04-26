const APP_URL = process.env.APP_URL || "https://c194-41-222-13-182.ngrok-free.app/";
function validateEmail(email) {    
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
     
}

function image_url(event) {
    try {
        const url =  `${APP_URL}`+ event?.image
        return url 
      } catch (error) {
        
      }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export   { validateEmail,image_url, formatDate }