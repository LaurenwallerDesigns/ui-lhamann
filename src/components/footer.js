import React, { Component } from 'react';
import github from '../images/social-github.svg';
import linkdin from '../images/social-linkdin.svg';
import twitter from '../images/social-twitter.svg';



export default class Footer extends Component{
    render() {
        return (
            (this.props.isUser !== null
                ? 
                <div><h3>User Footer</h3></div>
                : 
            <footer>
                <div className="social-btns">
                    <img src={github} className="s-btn" alt="github-link" />
                    <img src={linkdin} className="s-btn" alt="linkdin-link" />
                    <img src={twitter} className="s-btn" alt="twitter-link" />
                </div>
            </footer>
            )
        )
    }
}


