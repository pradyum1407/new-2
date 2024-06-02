import {Link} from "react-router-dom"
import "../style.scss"

export const Navbar = () => {
  return (
  <div>
    <div className="nav-container">
      <div className="logo">logo</div>
      <nav className="navbar">
        
   <Link to="/" className="link">Home</Link>
   <Link to="/register" className="link">Register</Link> 
   <Link to="/login" className="link" >Login</Link>


      </nav>
    </div>
  </div>
  )
}
