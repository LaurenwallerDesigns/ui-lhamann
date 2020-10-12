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
        console.log(this.props.location.pathname);
        const collapse = this.props.location.pathname !== "/" ? true : false;
        const logoLink = this.props.location.pathname !== "/" ? "/" : "/user-sign-in";
        const userlogoLink = this.props.location.pathname !== "/" ? "/user" : "/user-sign-in";

        return (
            (this.props.isUser !== null
                ?
                <React.Fragment>
                        <div className="d-flex flex-row justify-content-between w-100">
                        <div className="nav flex-row flex-md-row links w-70">
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
                        <Link to={userlogoLink}>
                            <img src={Logo} className="stamp-logo" alt="logo" />
                        </Link>
                    </div>
                </React.Fragment>
                : 
                <React.Fragment>
                        <div className="d-flex flex-row justify-content-between">
                        <div className="nav flex-row flex-lg-row links w-70">
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
                            <Link to={logoLink}>
                                <img src={Logo} className="stamp-logo" alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <img src={Underline} className="underline-img" style={collapse ? {"display": "none" }: {"display": "block"}}alt="/" />
                </React.Fragment> 
            )
        )
    }
}