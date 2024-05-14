import './layout.css';
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShuffle, faFireFlameCurved, faBookmark, faCircleUser, faClapperboard, faTv, faDragon, faFilm } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';
function Sidebar() {


    return (
        <>
            <div className='sidebar-wrapper'>
                <Link to="/" ><img src={logo} className='sidebar-logo' alt=''/></Link>
                <div className='sidebar-items'>
                    <Link to='/'><FontAwesomeIcon icon={faHouse} />Home</Link>
                    {/* <Link to='/random'><FontAwesomeIcon icon={faShuffle} />Random</Link> */}
                    <Link to='trends'><FontAwesomeIcon icon={faFireFlameCurved} />Trending</Link>
                    <Link to='subscriptions'><FontAwesomeIcon icon={faBookmark} />Library</Link>
                    <hr/>
                    <span>Sign in to like videos, comment, and subscribe.
                    <Link to="/login" >

                    <Button variant="outline-secondary" style={{marginTop:'10px'}}><FontAwesomeIcon icon={faCircleUser} />Sign In</Button>{' '}
                    </Link>
                    </span>
                    <hr/>
                    <Link to='/library'><FontAwesomeIcon icon={faClapperboard} />Movie</Link>
                    <Link to='/library'><FontAwesomeIcon icon={faTv} />Tv Series</Link>
                    <Link to='/library'><FontAwesomeIcon icon={faDragon} />Anime</Link>
                    <Link to='/library'><FontAwesomeIcon icon={faFilm} />Animation</Link>

                </div>
            </div>

        </>
    );
};
export default Sidebar;