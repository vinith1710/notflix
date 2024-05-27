import React, { useEffect, useState } from 'react'
import './layout.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ReactComponent as Sun } from "../../assets/themes/Sun.svg";
import { ReactComponent as Moon } from "../../assets/themes/Moon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faHouse, faFireFlameCurved, faBookmark, faCircleUser, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import Upload from './upload';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../assets/images/logo.png"

const Header = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'dark')
  }
  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'light')
  }
  
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  }

  const { currentUser } = useSelector(state => state.user)
  // const currentUser = useSelector(state=>state.user.currentUser)
  
  const handleLogout = () => {
    dispatch(logout())
    navigate("/");
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const path = useLocation().pathname;
  if(path == "/"){
    return;
  }

      return (
    <>
      <div className='header'>
      <Button className='d-xs-block d-sm-none' variant="primary" onClick={handleShow}>
        Launch
      </Button>
        <div className='dark_mode'>
          <input
            className='dark_mode_input'
            type='checkbox'
            id='darkmode-toggle'
            onChange={toggleTheme}
            />
          <label className='dark_mode_label' for='darkmode-toggle'>
            <Sun />
            <Moon />
          </label>
        </div>
        <Form className="d-flex">
          <Form.Control
            type="search"
            // placeholder="Search"
            className="me-2"
            aria-label="Search"
          />

          <Button variant="outline-success">Search</Button>
        </Form>
        {currentUser && 
        // (
          <div className='loggedin-user d-none d-sm-flex'>
            <Button variant="outline-secondary" onClick={()=>setOpen(true)}> Add Video</Button>
            <img src={currentUser.img} />
            <DropdownButton id="dropdown-basic-button" variant="info" title={currentUser.name}>
              <Dropdown.Item onClick={handleLogout}> Logout</Dropdown.Item>
            </DropdownButton>
          </div>
      //   ) : (
      //   <Link to="/"><Button variant="outline-secondary" ><FontAwesomeIcon icon={faCircleUser} /> Sign In</Button>{' '}</Link>
      // )
      }
      </div>
      {open && <Upload setOpen={setOpen} />}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><Link to="home" onClick={handleClose}><img src={logo} className='sidebar-logo' alt=''/></Link></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='loggedin-user'>
        <Button variant="outline-secondary" onClick={()=>setOpen(true)}> Add Video</Button>
            <img src={currentUser.img} />
            <DropdownButton id="dropdown-basic-button" variant="info" title={currentUser.name}>
              <Dropdown.Item onClick={handleLogout}> Logout</Dropdown.Item>
            </DropdownButton>
          </div>
          <hr/>
          <div className='sidebar-items'>

          {currentUser.isAdmin && <Link to='dashboard' onClick={handleClose}><FontAwesomeIcon icon={faChartLine} />Dashboard</Link>}
                    <Link to='home' onClick={handleClose}><FontAwesomeIcon icon={faHouse} />Home</Link>
                    <Link to='trends' onClick={handleClose}><FontAwesomeIcon icon={faFireFlameCurved} />Trending</Link>
                    <Link to='subscriptions' onClick={handleClose}><FontAwesomeIcon icon={faBookmark} />Library</Link>
          </div>
                    <hr/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )

}

export default Header;