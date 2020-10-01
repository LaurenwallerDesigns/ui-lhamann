import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
let blogsDisplay;
let text;
let disabled = false;
export default class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            blog: 10,
            blogData: null,
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3030/blog')
        .then( res => {
            this.setState({
                blogData: res.data.data
            })
        })
    }
    renderBlogs() {
        console.log('ran');
        const blogs = this.state.blogData;
        const target = (blogs.length - 1) - this.state.blog;

        blogsDisplay = blogs.map((recent, index) => {
            if(index >= target){
                const url = `/blog/${recent._id}`;
                return (
                        <div className="recent-blog" id={recent._id}>
                            <Link to= {url}>
                                <h1>{recent.title}</h1>
                                <h3>{recent.description}</h3>
                            </Link>
                        </div>                    
                )
            }
        })
        if(this.state.blog >= this.state.blogData.length - 1){
            text = "End";
            disabled = true;
        }else{
            text="Load More";
        }
        console.log(blogsDisplay);
    }
    render() {
        if(this.state.blogData){
            this.renderBlogs();
        }
        return (
            <div>
            {blogsDisplay}
            {!disabled ? (
            <button onClick={() => {
                this.setState({
                    blog: this.state.blog + 5
            });
            this.renderBlogs()
            }}>{text}</button>
             ) : (
                <button disabled>{text}</button>
            )}
            </div>
        )
    }
}

// Figure out how to make clickable link toblog page