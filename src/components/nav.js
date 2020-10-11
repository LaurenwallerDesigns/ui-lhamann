import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from "../images/stamp-logo.svg";
import Underline from '../images/underline.svg';
import "bootstrap/dist/css/bootstrap.min.css";
export default class Nav extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            (this.props.isUser 
                ?
                <React.Fragment>
                        <div className="d-flex flex-row justify-content-between w-100">
                        <div className="nav flex-column flex-md-row links">
                            <Link to= '/blogs' className="nav-link">
                                    Blogs
                            </Link>
                            <Link to= '/create' className="nav-link">
                                New Post
                            </Link>
                            <Link to='/settings' className="nav-link">
                                Settings
                            </Link>
                            <Link to='/logout' className="nav-link">
                                Log-Out
                            </Link>
                        </div>
                    </div>
                    <img src={Underline} className="underline-img" alt="/" />
                </React.Fragment>
                : 
                <React.Fragment>
                        <div className="d-flex flex-row justify-content-between w-100">
                        <div className="nav flex-column flex-lg-row links">
                            <Link to= '/portfolio' className="nav-link">
                                    Portfolio
                            </Link>
                            <Link to= '/blogs' className="nav-link">
                                Blog
                            </Link>
                            <Link to='/contact' className="nav-link">
                                Contact
                            </Link>
                        </div>
                        <div className="logo-section">
                            <Link to="/user-sign-in">
                                <img src={Logo} className="stamp-logo" alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <img src={Underline} className="underline-img" alt="/" />
                </React.Fragment> )
        );
    }
}