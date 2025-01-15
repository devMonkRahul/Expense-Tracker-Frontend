import React from 'react'
import { StickyNavbar as Navbar } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
