import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/signup/Signup'
import { Route,Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function App() {
  

  return (
    <>
   
    
    
    
    <Routes>
    <Route
      path='/'
      element={localStorage.getItem('auth-token')!==null?<Home/>: <Navigate to="/login"/>}

      />
      <Route
      path='login'
      element={ <Login/>}
      />
      <Route
      path='signup'
      element={ <Signup/>}
      />
    
    </Routes>
    </>
  )
}

export default App
