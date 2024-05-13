import './layout.css';
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";

function Sidebar() {
   

    return (
        <>
        <div className='sidebar-wrapper'>
            <img src={logo} className='sidebar-logo'/>
            <div className='sidebar-items'>
        <Link to='/'>Home</Link>
        <Link to='/random'>Random</Link>
            </div>
        </div>
          
        </>
        );
  };
  export default Sidebar;