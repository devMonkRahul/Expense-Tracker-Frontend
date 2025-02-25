import React from 'react'
import { StickyNavbar as Navbar } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'

export default function App() {

  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </>
  )
}
