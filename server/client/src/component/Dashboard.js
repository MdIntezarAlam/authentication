import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/mix.css'

const Dashboard = () => {
  const [email, setEmail] = useState([])

  const navigate = useNavigate()



  const displayUser = async () => {
    const token = localStorage.getItem("userAuthentication") //get data  from localsto...

    // console.log("getItem", token)
    ///call  an verify api

    const res = await fetch("/api/v1/validUser", {
      method: "GET",
      //headers is seted in authentication.js file in server.js
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json()

    if (data.status === 401 || !data) {
      navigate("/*")
    }
    else {
      // console.log("user varifid")
      setEmail(data)
      navigate("/das")

    }
  }

  useEffect(() => {
    displayUser()

  }, [])



  return (
    <div className='dss'>
      <div>User Email:</div>
    </div>
  )
}

export default Dashboard