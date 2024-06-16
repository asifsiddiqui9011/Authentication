
import { useState } from "react"
import { Link } from "react-router-dom"
const Signup = () => {
  const [signup,setSignup] = useState({
    username:"",
    email:"",
    password:"",
})
const HandleChange =(e)=>{
   setSignup({...signup,[e.target.name]:e.target.value})
}

const handleSubmit= async(event)=>{
  event.preventDefault();
  console.log(signup)
  let responseData;
  await fetch('http://localhost:8080/register',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(signup),
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
        <h1>Register</h1>
      <input type="text" placeholder="Enter Your Name" value={signup.username} name="username" onChange={HandleChange} required/>
      <input type="text" placeholder="Enter email address" value={signup.email} name="email" onChange={HandleChange} required/>
      <input type="password" placeholder="Enter password" value={signup.password} name="password" onChange={HandleChange} required/>
      <button type="submit" >SignUp</button>
      <Link to={'/login'} style={{textDecoration:"none", textAlign:"center"}}><p>Already have an account Click here to <b style={{color:"blue"}}>Login</b></p></Link>
    </div>
    </form>
  )
}

export default Signup
