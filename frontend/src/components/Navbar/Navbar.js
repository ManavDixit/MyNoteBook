import React from "react";
//importing css
import "./Navbar.css";
//importing Link fro  react-router-dom
import {Link,useLocation,useNavigate} from 'react-router-dom'
export default function Navbar() {
  const location=useLocation();
  //intializing useNavigate
  const navigate=useNavigate();
  //function to Logout User
  const LogoutUser=()=>{
    //deleting authToken from localStorage
    localStorage.removeItem('authToken');
    //redirecting to /login
    navigate('/login');
  }
  return (
    <nav id="navBar">
      <h1>MyNoteBook</h1>
      <h1>|</h1>
      <ul>
        <li>
          <Link to="/" className={location.pathname==='/' ? 'active':''}>Home</Link>
        </li>
      </ul>
      {!localStorage.getItem('authToken')?
        <>
      <ul>
        <li>
          <Link to="/signup" className={location.pathname==='/signup' ? 'active':''}>Sign Up</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/login' className={location.pathname==='/login'?'active':''}>Login</Link>
        </li>
      </ul>
</>
:
<ul><li><Link onClick={LogoutUser} to='/login'>Logout</Link></li></ul>
}
    </nav>
  );
}
