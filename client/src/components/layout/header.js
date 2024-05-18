import React, { useState } from 'react'
import './layout.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ReactComponent as Sun } from "../../assets/themes/Sun.svg";
import { ReactComponent as Moon } from "../../assets/themes/Moon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faVideo } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import Upload from './upload';
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
    navigate("/login");
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='header'>

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
        {currentUser ? (
          <div className='loggedin-user'>
            <FontAwesomeIcon icon={faVideo} onClick={()=>setOpen(true)}/>
            <img src={currentUser.img} />
            <DropdownButton id="dropdown-basic-button" variant="info" title={currentUser.name}>
              <Dropdown.Item onClick={handleLogout}> Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        ) : (<Link to="login">
          <Button variant="outline-secondary" ><FontAwesomeIcon icon={faCircleUser} /> Sign In</Button>{' '}
        </Link>)}
      </div>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Header;