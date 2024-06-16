import { useState } from "react";

const Home = () => {

const [userData,setUserData]= useState('');


  if(localStorage.getItem('auth-token')){
   
    fetch('http://localhost:8080/getuser',{
        method:"GET",
        headers:{
            Accept:'applocation/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then((data)=>setUserData(data.data));
   
}
  
  return (
    <div className="LoginContainer" style={{width:"300px"}}>
        <h1>Home</h1>
        <div style={{display:"flex", alignItems:"center" , justifyContent:"center"}}>
           <h3>Username:-</h3><p>{userData.username}</p>
        </div>
        <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between"}}>
           <h3>Email:-</h3><p>{userData.email}</p>
        </div>
    
     
     {
     localStorage.getItem('auth-token')?
     <button  onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/login')}}>Logout</button>
     :""
     }
    </div>
  )
}

export default Home
