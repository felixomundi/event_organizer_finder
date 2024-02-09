function validateEmail(email) {    
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
     
}

function image_url(event) {
    try {
        const url =  `http://192.168.171.114:5000/`+ event?.image
        return url 
      } catch (error) {
        
      }
}
export   { validateEmail,image_url }