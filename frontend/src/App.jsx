import './App.css'
// import router from react-router
import { Routes, Route } from "react-router-dom";

// import the page components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import AddEmployee from './pages/add-employee/AddEmployee'


function App() {
  

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
      </div>
    </>
  )
}

export default App
