import Axios from 'axios';
import React, { Component, useState } from 'react';
import like from '../images/like-btn.svg';
import menu from '../images/menu-btn.svg';
import github from '../images/social-github.svg';
import linkdin from '../images/social-linkdin.svg';
import twitter from '../images/social-twitter.svg';
import NewComment from './newcomment';

let display;
export default class BlogPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            body: "",
            date: "",
            category: "",
            id: "",
            createdBy: {
                firstName: "",
                lastName: ""
            },
            jwt: null,
            comments: [],
            displayNewComment: false
        }
        this.newCommentDisplay = this.newCommentDisplay.bind(this);
    }
    componentDidMount() {
        const url = `http://localhost:3030/blog/${this.props.match.params.id}`;
        Axios.get(url, {
            withCredentials: true
        })
        .then(res => {
            this.setState({
                title: res.data.data.title,
                description: res.data.data.description,
                body: res.data.data.body,
                category: res.data.data.category,
                date: res.data.data.createdAt,
                id: res.data.data._id
                // firstName: res.data.data.createdBy.firstName === null? "unknown" : res.data.data.createdBy.firstName ,
        })
        if(res.status >= 400){
            display = (
                <React.Fragment>
                    <h1>Uh Oh something went wrong</h1>
                    <h2>Please Try Again</h2>
                </React.Fragment>
            )
        }
    })
    }

    newCommentDisplay() {
        this.setState({
            displayNewComment: !this.state.displayNewComment
        });
    }
    render() {
        const displaycommentForm = this.state.displayNewComment ? <NewComment id={this.state.id} /> :  <button className='styled-btn' id="comment-btn" onClick={this.newCommentDisplay}>Leave a Comment</button>;
        const displayClose = this.state.displayNewComment ? <button className="close-btn" onClick={this.newCommentDisplay}>X</button> : null;
        return (
            <div className="outer-div-blog-post">
                {display}
                <div className="flex-header">
                    <span className="date">{this.state.date}</span>
                    <img src={menu} className="menu-btn" alt="menu-open" />
                </div>
                <div className="blog-post">
                    <h1 className="Title-of-blog">{this.state.title}</h1>
                    <span className="author">{this.state.firstName} {this.state.lastName}</span>
                    <h2 className="description">{this.state.description}</h2>
                    <span className="category">{this.state.category}</span>
                    <p className="body">{this.state.body}</p>
                    <div className="styled-com-like">
                        {displayClose}
                        {displaycommentForm}
                        <div className="like-group">
                            <img src={like} className="like-btn" alt="heart" />
                            <p className="styled-btn">Like</p>
                        </div>
                        <h4 className="related-blog-btn">Related Blogs</h4>
                    </div>
                </div>
                <div className="all-comments">
                    <div className="comment" id="#">
                        <h2 className="com-title">Title</h2>
                        <div className="span-flex">
                            <h2 className="com-name"> Mock-name </h2>
                            <span className="com-date">mock-date</span>
                        </div>
                        <p className="com-body">body</p>
                        <button className="com-reply">Reply</button>
                    </div>
                </div>
                <section className="blog-footer">
                <img src={github} className="s-btn" alt="github-link" />
                    <img src={linkdin} className="s-btn" alt="linkdin-link" />
                    <img src={twitter} className="s-btn" alt="twitter-link" />
                </section>
            </div>
        )
    }
}