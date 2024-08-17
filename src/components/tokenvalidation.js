const { jwtDecode } = require("jwt-decode");


const tokenvalidate = ()=>{

    const token = localStorage.getItem("token")
   
    if (token) {
        const decodedtoken = jwtDecode(token);
    
        const currentTime = Math.floor(Date.now() / 1000);
  

        let isTokenvalid = decodedtoken.exp > currentTime
     
        return isTokenvalid
     
    }
   
    return false
    
}

export default tokenvalidate
