import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {

    const [login,setLogin] = useState({
        email:"",
        password:"",
    })

    const handleChange =(e)=>{
       setLogin({...login,[e.target.name]:e.target.value}) 
    }

    const handleSubmit= async(event)=>{
        event.preventDefault();
        console.log(login)
        let responseData;
        await fetch('http://localhost:8080/login',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',
          },
          body:JSON.stringify(login),
        }).then((response)=>response.json())
        .then((data)=>responseData=data)
      
        if(responseData.success){
          localStorage.setItem('auth-token',responseData.token);
          window.location.replace("/");
        }else{
          alert(responseData.message );
        }
      }

  return (
       <form onSubmit={handleSubmit}>
        <div className="LoginContainer">
            <h1>Login</h1>
            <input type="email" placeholder="Enter email" id="email" value={login.email} name="email" onChange={handleChange} required/>
            <input type="password" placeholder="Enter password"  id="password" value={login.password} name="password" onChange={handleChange} required/>
            <button type="submit" >Login</button>
            <Link to={'/signup'} style={{textDecoration:"none",textAlign:"center"}}><p> Don't have Account Click here to <b style={{color:"blue"}}>Register</b></p></Link>
        </div>
        </form>
  )
}

export default Login
