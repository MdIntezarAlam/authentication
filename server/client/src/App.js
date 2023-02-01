import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Header, Signup, Error } from './component'
import Login from './component/Login'
import { PAGE_PATH } from './utils/constant'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={PAGE_PATH.root} element={<Login />} />
        <Route path={PAGE_PATH.SIGNUP} element={<Signup />} />
        <Route path={PAGE_PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PAGE_PATH.ERROR} element={<Error />} />
      </Routes>
    </>
  )
}

export default App