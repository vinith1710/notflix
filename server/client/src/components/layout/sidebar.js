import './layout.css';
import logo from "../../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFireFlameCurved, faBookmark, faClapperboard, faTv, faDragon, faFilm, faChartLine } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux';
function Sidebar() {

    const {currentUser} = useSelector(state=>state.user)
    // const currentUser = useSelector(state=>state.user.currentUser)
    const path = useLocation().pathname;
    if(path === "/"){
        return;
    }

        return (
            <>
            <div className="app-sidebar d-none d-sm-block">

            <div className='sidebar-wrapper'>
                <Link to="home" ><img src={logo} className='sidebar-logo' alt=''/></Link>
                <div className='sidebar-items'>

                    {currentUser.isAdmin && <Link to='dashboard'><FontAwesomeIcon icon={faChartLine} />Dashboard</Link>}
                    <Link to='home'><FontAwesomeIcon icon={faHouse} />Home</Link>
                    <Link to='trends'><FontAwesomeIcon icon={faFireFlameCurved} />Trending</Link>
                    <Link to='subscriptions'><FontAwesomeIcon icon={faBookmark} />Library</Link>
                    <hr/>

                    {/* {!currentUser && <><span>Sign in to like videos, comment, and subscribe.
                    <Link to="/login" >
                    <Button variant="outline-secondary" style={{marginTop:'10px'}}><FontAwesomeIcon icon={faCircleUser} />Sign In</Button>{' '}
                    </Link>
                    </span>
                <hr/></>} */}

                    <Link to='movie'><FontAwesomeIcon icon={faClapperboard} />Movie</Link>
                    <Link to='tvseries'><FontAwesomeIcon icon={faTv} />Tv Series</Link>
                    <Link to='anime'><FontAwesomeIcon icon={faDragon} />Anime</Link>
                    <Link to='animation'><FontAwesomeIcon icon={faFilm} />Animation</Link>

                </div>
            </div>
                </div>

        </>
    );

};
export default Sidebar;