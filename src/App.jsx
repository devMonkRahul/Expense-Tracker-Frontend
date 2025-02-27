import React from 'react'
import { StickyNavbar as Navbar } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'

export default function App() {
  const path = window.location.href.split('/')[3];  
  
  return (
    <div className={path === '' ? 'bg-black' : 'bg-white'}>
      <ThemeProvider>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </div>
  )
}
