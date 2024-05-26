import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate=useNavigate()
const [Data,setData]=useState({
  username:"",
  email:"",
  password:""
})
const [error,seterror]=useState("")
const [success,setsuccess]=useState("")

function handleChange(e){
setData({
  ...Data,
  [e.target.name]:e.target.value
})
seterror("")
setsuccess("")
console.log(Data);
}
  
async  function RegisterUser(e){
e.preventDefault()

if(!Data.username||!Data.password||!Data.email){
  seterror("please fill the input fileds")
  return
}

try{
  const response =await axios.post("http://localhost:3000/register",{
    username:Data.username,
    email:Data.email,
    password:Data.password
  })
  seterror("")
  setsuccess("User is registered succesfully")

  setTimeout(() => {
    navigate("/login")
  }, 1000);


  }catch (error) {
    if (error.response && error.response.status === 411) {
      seterror(error.response.data.error || "User already exists" || "validation failed");
    } else {
      seterror("There was an error registering the user.");
    }
    console.error("There was an error registering the user!", error);
  }
}

  return (
    <div className='main'>
    <div className='form-container'>
<form onSubmit={RegisterUser} className='form'>
<h3>Register</h3>
<div className='div'>
<input type='text' name="username" value={Data.username} placeholder='username' onChange={handleChange} className='input'/>
</div>

<div className='div'>
<input type='email' name="email" value={Data.email} placeholder='email' onChange={handleChange}  className='input'/>
</div>

<div className='div'>
<input type='password' name="password" value={Data.password} placeholder='password' onChange={handleChange}  className='input'/>
</div>

<input type='submit' value="register"  className='btn'/>
</form>

{error && <div className='error'>{error}</div>}
 {success && <div className='success'>{success}</div> }
    </div>
    </div>
  )
}
