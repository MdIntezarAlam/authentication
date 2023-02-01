import React, { useState } from 'react'
import '../Styles/mix.css'
import { Link, useNavigate } from 'react-router-dom'


const initialValiues = {
  name: "",
  email: "",
  password: "",
  c_password: "",
}
const Signup = () => {


  const [inputValues, setInputValues] = useState(initialValiues)
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target


    setInputValues(() => {
      return {
        ...inputValues, [name]: value
      }
    })
  }

  const addUser = async (e) => {
    e.preventDefault()
    const { name, email, password, c_password } = inputValues

    //validation
    if (name === "") {
      alert("name is required")
    } else if (email === "") {
      alert("Email is required")
    } else if (!email.includes("@")) {
      alert("Email is Invalid")
    } else if (password === "") {
      alert("password is Invalid")
    } else if (password.length < 6) {
      alert("password should be greater than 6 char ")
    } else if (password.length > 8) {
      alert("password should not be greater than 8 char ")
    } else if (c_password === "") {
      alert("c_password is required")
    } else if (password !== c_password) {
      alert("c_password is not matched")
    }
    else {
      //send data in to the backend

      const data = await fetch("/api/v1/signup ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, c_password })
      })
      const res = await data.json()
      // console.log(res)
      if (res.status === 200) {
        setInputValues(...initialValiues, { name: "", email: "", password: "", c_password: "" })
      }
   
    }
  }


  return (
    <div className='login'>
      <div className='box'>
        <h1>WELCOME TO      SIGNUP</h1 >
        <p>hey we are glad you are back , please login</p>
        <div className='input_fiel'>
          <input
            type="text"
            value={inputValues.name}
            onChange={handleChange}
            name='name'
            placeholder='Enter your Name'
            autoComplete='off'
          />
          <input
            type="text"
            value={inputValues.email}
            onChange={handleChange}
            name='email'
            placeholder='Enter your email address'
            autoComplete='off'
          />
          <input
            type="password"
            value={inputValues.password}
            onChange={handleChange}
            name='password'
            placeholder='Enter your Passwrd'
            autoComplete='off'
          />
          <input
            type="password"
            value={inputValues.c_password}
            onChange={handleChange}
            name='c_password'
            placeholder='Enter your   Passwrd'
            autoComplete='off'
          />
        </div>
        <div className='btns'>
          <button onClick={addUser}>Signup</button>
        </div>
        <div className='account'>
          <span>Already have an account? <Link to="/">Login Now</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Signup