import React, { useState } from 'react';
import Cookies from 'js-cookie'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import defaultImg from '../../logo.svg';

import './Navbar.css';
import { SidebarData } from './SidebarData';

export default function Navbar({ setToken, activeTrip, name }) {
    const location = useLocation();
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    function logoutUser() {
        return fetch(process.env.REACT_APP_END_POINT + '/signout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('tokken')
            },
            // body: JSON.stringify(credentials)
            // }).then(data => data.json());
        }).then(setToken(null));
    }

    const handleLogOut = async e => {
        e.preventDefault();
        const data = await logoutUser();
        console.log(data);
        window.location.reload();
    }

    function deleteUser() {
        return fetch(process.env.REACT_APP_END_POINT + '/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('tokken')
            }
        }).then((res) => {
            console.log(res)
            setToken(null)
        })
    }
    
    const handleDeleteProfile = async e => {
        e.preventDefault();
        const data = await deleteUser();
        console.log(data);
        window.location.reload();
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                {/* Primary Navbar */}
                <div className='navbar'>
                    {Cookies.get('tokken') ?
                        <Link to='#' className={'menu-bars'} id="hamburger">
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link> : null}

                    <div id='logo' data-test="CarPooling-logo">
                        <AiIcons.AiFillCar />
                        <Link to='/' className='menu-bars nav-text'>
                            CarPooling App
                        </Link>
                    </div>

                    {Cookies.get('tokken') ?
                        <div className={'main-buttons'}>
                            {/* <div id='main-buttons'> */}
                            <Link to='/active-trip'>
                                <Button variant='primary' className={activeTrip ? 'main-button' : 'hidden'} disabled={'/active-trip' === location.pathname} data-test="activeTrip-button">
                                    <AiIcons.AiOutlineCar style={{ color: 'black', marginBottom: '0.1rem', marginRight: '0.3rem' }} data-test='activeTrip-icon' /> Active Trip
                                </Button>
                            </Link>
                            <Link to='/drive'>
                                <Button variant='primary' className={activeTrip ? 'hidden' : 'main-button'} disabled={'/drive' === location.pathname} data-test="drive-button">
                                    <AiIcons.AiTwotoneCar style={{ color: 'black', marginBottom: '0.1rem', marginRight: '0.3rem' }} data-test='drive-icon' /> Drive
                                </Button>
                            </Link>
                            <Link to='/ride'>
                                <Button variant='primary' className={activeTrip ? 'hidden' : 'main-button'} disabled={'/ride' === location.pathname} data-test="ride-button">
                                    <MdIcons.MdPeopleOutline style={{ color: 'black', marginRight: '0.3rem' }} data-test='ride-icon' /> Ride
                                </Button>
                            </Link>
                        </div> : null}
                </div>
                {/* Primary Navbar end*/}

                {/* Sidebar*/}
                {Cookies.get('tokken') ?
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='sidebar-top-items' onClick={showSidebar}>
                            <li className='navbar-toggle' style={{ paddingLeft: '1rem' }}>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            <li>
                                {/* <img src={props.user.img} alt={props.user.name} /> */}
                                {/* <img src={defaultImg} alt='Name' data-test="name-image" /> */}
                                <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" className='p-2 mx-5' alt='Name' data-test="name-image" width='180px'/>

                            </li>
                            <li style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ color: 'white' }}>{name}</div>
                            </li>
                            {SidebarData.map((item, index) => {
                                if ((activeTrip && item.title !== 'Drive' && item.title !== 'Ride') || (!activeTrip && item.title !== 'Active Trip'))
                                    return (
                                        <li key={index} className='nav-text'>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span style={{ marginLeft: '1rem' }}>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                            })}
                        </ul>
                        <ul className='sidebar-bottom-items' onClick={showSidebar}>
                            <li className='nav-text' data-test="logout-button">
                                <Link to='/' onClick={handleLogOut} > {/*call logout method*/}
                                    <FaIcons.FaSignOutAlt />
                                    <span style={{ marginLeft: '1rem' }}>Logout</span>
                                </Link>
                            </li>
                            <Button id="deleteProfileButton" variant="danger" data-test="delete-button" onClick={handleDeleteProfile}>Delete Profile</Button>
                        </ul>
                    </nav> : null}
                {/* Sidebar end*/}
            </IconContext.Provider>
        </>
    );
}