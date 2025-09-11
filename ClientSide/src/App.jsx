import { useState } from 'react';
import './App.css';
import Home from './components/Home.jsx'
import Header from './components/Header.jsx'
import UserDashboard from './components/UserDashboard.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import DownloadPage from './components/DownloadPage.jsx';
import PurchasePage from './components/PurchasePage.jsx';
import React from 'react';
import { createBrowserRouter , RouterProvider} from 'react-router-dom';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <UserDashboard/>,
    children:[
      {
        path: '/home',
        element: <Home/>,      
      },
      {
        path: '/plans',
        element: <PurchasePage/>,
      }
    ]
  },
  {
    path: 'login',
    element: <LoginPage/>,
  },
  {
    path: 'signup',
    element: <SignupPage/>,
  },
  {
    path: '/f/:shortCode',
    element: <DownloadPage/>,
  }

])

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router= {browserRouter}/>
    </>
  )
}

export default App
