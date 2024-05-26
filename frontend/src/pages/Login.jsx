import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  const [Data, setData] = useState({
    email: "",
    password: ""
  })
  const [error, seterror] = useState("")
  const [success, setsuccess] = useState("")
  const [isloggedin, setisloggedin] = useState(false)

  const login = setisloggedin(true)

  const logout = setisloggedin(false)

  function handleChange(e) {
    setData({
      ...Data,
      [e.target.name]: e.target.value
    })
    console.log(Data);
    seterror("")
    setsuccess("")
  }

  async function loginUser(e) {
    e.preventDefault()

    if (!Data.email || !Data.password) {
      seterror("please fill the data field first")
      return
    }
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: Data.email,
        password: Data.password
      })
      console.log(response);
      seterror("")
      login()
      setsuccess("Succesfully LoggedIn")

      setTimeout(() => {
        navigate("/")
      }, 1000);


    } catch (error) {
      if (error.response && error.response.status === 411) {
        seterror(error.response.data.error || "user is not exist")
      } else {
        seterror("There was an error logging user.");
      }
    }
  }

  return (
    <div className='main'>
      <div className='form-container'>

        <form onSubmit={loginUser} className='form'>
          <h3>Login</h3>

          <div className='div'>
            <input type='email' placeholder='email' name='email' value={Data.email} onChange={handleChange} className='input' />
          </div>

          <div className='div'>
            <input type='password' placeholder='password' name='password' value={Data.password} onChange={handleChange} className='input' />
          </div>

          <input type='submit' value="Login" className='btn' />
        </form>
        {error && <div className='error'>{error}</div>}
        {success && <div className='success'>{success}</div>}
      </div>
    </div>
  )
}
