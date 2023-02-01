import React, { useState } from 'react'
import '../Styles/mix.css'
import { Link, useNavigate } from 'react-router-dom'


const initialValiues = {
  email: "",
  password: ""
}


const Login = () => {
  const [loginValues, setLoginValues] = useState(initialValiues)
  const navigate = useNavigate()

  const loginHandleChange = (e) => {
    // console.log(e.target.value)
    const { name, value } = e.target
    setLoginValues(() => {
      return {
        ...loginValues, [name]: value
      }
    })
  }
  // console.log(loginValues)

  const submitLoginData = async (e) => {
    e.preventDefault()
    const { email, password } = loginValues

    if (email === "") {
      alert("Enter Email please")
    } else if (!email.includes("@")) {
      alert("Invalid Email addrees")
    } else if (password === "") {
      alert("Enter Password please")
    } else if (password.length < 6) {
      alert("Password length shold be greater than 6 char")
    } else if (password.length > 8) {
      alert("Password length shold not  be greater than 8 char")
    }
    else {
      console.log("User Logined")
      // setLoginValues("user logined",)
      //send data in  backend
      const data = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })

      })
      const res = await data.json()
      // console.log("inside",res)
      if (res.status === 200) {
        localStorage.setItem("userAuthentication", res.token)
        
        navigate("/das")
        setLoginValues(...loginValues, { email: "", password: "" })
      }

    }
  }


  return (
    <div className='login'>
      <div className='box'>
        <h1>WELCOME BACK TO LOGIN</h1 >
        <p>hey we are glad you are back , please login</p>
        <div className='input_fiel'>
          <input
            type="text"
            name='email'
            value={loginValues.email}
            onChange={loginHandleChange}
            placeholder='Enter your email address'
            autoComplete='off'
          />
          <input
            type="password"
            name='password'
            value={loginValues.password}
            onChange={loginHandleChange}
            placeholder='Enter your  Passwrd'
            autoComplete='off'
          />
        </div>
        <div className='btns'>
          <button onClick={submitLoginData}>Login</button>
        </div>
        <div className='account'>
          <span>Don't have an account? <Link to="/signup">Signup now</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login