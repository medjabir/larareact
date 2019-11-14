import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="/">Larareact</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <!-- Left Side Of Navbar --> */}
                    <ul className="navbar-nav mr-auto">
                        <Link className="mr-2 ml-2" to='/home'>Home</Link> | 
                        <Link className="mr-2 ml-2" to='/login'>Login</Link> | 
                        <Link className="mr-2 ml-2" to='/register'>Register</Link> | 
                        <Link className="mr-2 ml-2" to='/verify'>Verify</Link>
                    </ul>

                    {/* Right Side Of Navbar */}
                    
                    { 
                        props.isAuthenticated  ? 
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                        <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {props.userinfo.name} <span className="caret"></span>
                                        </a>

                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" onClick={() => props.handleLogoutClick()}>Logout</a>
                                        </div>
                                    </li>
                                </ul>
                            :
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </ul>
                    } 
                    
                </div>
            </div>
        </nav>
    )
}

export default Header;
