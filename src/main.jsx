import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPopup from './utils/Popup/ErrorPopup/ErrorPopup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ErrorPopup />
    </Provider>
  </StrictMode>,
)
