import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.styles.scss';

import logo from '../assets/logo192.png'

const Header = props => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);

    useEffect(() => {
        setAuthValue(props.isAuthenticated);
    }, [props]);


    return (
        <div className='header-cover'>
            {authValue ? 
                <div className='header'>
                    <Link to='/' className='logo-holder'>
                        <img className='logo-holder' alt='logo' src={logo}></img>
                    </Link>
                    <div className='routes'>
                        <Link to='/' className='route'>
                            Times
                        </Link>
                        <Link to='/invoice' className='route'>
                            Invoice
                        </Link>
                        <Link to='/customer' className='route'>
                            Customers
                        </Link>
                        <Link to='/calendar' className='route'>
                            Calendar
                        </Link>
                    </div>
                    <div className='edge'>
                        <Link to='/settings' className='route'>
                            Settings
                        </Link>
                        <Link to='/signout' className='route'>
                            Log Out
                        </Link>
                    </div>
                </div>
                :
                <div className='header'>
                    <Link to='/' className='logo-holder'>
                        <img className='logo-holder' alt='logo' src={logo}></img>
                    </Link>
                    <div className='routes'>
                        <Link to='/' className='route'>
                            Home
                        </Link>
                        <Link to='/register' className='route'>
                            Sign Up
                        </Link>
                        <Link to='/signin' className='route'>
                            Sign In
                        </Link>
                    </div>
                    <div className='edge'>
                    </div>
                </div>
            }   
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Header);