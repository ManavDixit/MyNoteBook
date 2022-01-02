import React from 'react'; 
//importing css
import "./App.css";
//importing Navbar components
import Navbar from "./components/Navbar/Navbar";
//importing Home component
import Home from "./components/Home/Home";
//importing About component
import Signup from './components/Signup/Signup'
//importing Login component
import Login from './components/Login/Login';
//importing spinner components
import Spinner from './components/Spinner/Spinner';
//importing components of react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//importing NoteState
import NoteState from "./context/notes/NoteState";
//importing alert components
import Alert from "./components/Alert/Alert";
const App=()=> {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route  path="/signup" element={<Signup />} />
            <Route path='/login' element={<Login/>} />
            <Route path='*' element={<h1>Not Found</h1>}/>
          </Routes>
            <Spinner/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
