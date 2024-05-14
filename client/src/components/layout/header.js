import React from 'react'
import './layout.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Sun } from "../../assets/themes/Sun.svg";
import { ReactComponent as Moon } from "../../assets/themes/Moon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Header = () => {

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
          <Link to="login">
        <Button variant="outline-secondary" ><FontAwesomeIcon icon={faCircleUser} /> Sign In</Button>{' '}
          </Link>
      </div>
    </>
  )
}

export default Header