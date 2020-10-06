import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from "../images/stamp-logo.svg";
import github from '../images/social-github.svg';
import linkdin from '../images/social-linkdin.svg';
import twitter from '../images/social-twitter.svg';

export default class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            portfolioredirect: "/portfolio",
            blogredirect: "/blogs",
            bulletJournalredirect: '/bullet-journal'
        }
    }
    render() {
        return (
            <React.Fragment>
            <div className="logo-section">
                    <img src={Logo} className="stamp-logo" alt="logo" />
                </div>
            <div className="index-section">
                    <Link to= {this.state.portfolioredirect}>
                            <h1> Portfolio</h1>
                    </Link>
                    <Link to= {this.state.blogredirect}>
                            <h1> Blog</h1>
                    </Link>
                    <Link to={this.state.bulletJournalredirect}>
                            <h1> Bullet Journal</h1>
                    </Link>
            </div>
            <div className="about-section">
                <h2 className="About"> About </h2>
            </div>
            <div className="written-about-section">
                <h3>This is my about me section</h3>
                <p>All about me and my section of about me. So much information about me.</p>
            </div>
            <footer>
                <div className="social-btns">
                    <img src={github} className="s-btn" alt="github-link" />
                    <img src={linkdin} className="s-btn" alt="linkdin-link" />
                    <img src={twitter} className="s-btn" alt="twitter-link" />
                </div>
            </footer>
            </React.Fragment>
        );
    }
}