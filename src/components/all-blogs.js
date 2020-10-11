import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
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
            isUser: false
        }
    }
    componentDidMount() {
        //If isUser === true then get just this user's blog, if not get all blogs
        const url = this.props.isUser ?' http://localhost:3030/api/blog/user' : 'http://localhost:3030/api/blog';
        Axios.get(url, {
            withCredentials: true
        })
        .then( res => {
            this.setState({
            //Set State to all the data that GET responds with
                blogData: res.data.data
            })
        })
    }
    renderBlogs() {
        const blogs = this.state.blogData;
        //Mapping over all the blogData gathered from GET
        blogsDisplay = blogs.map((recent, index) => {
        //This is pulling the most recent blog to be the Featured Blog
        //Eventuall would like to add a boolean Featured Button on UPDATE/NEW POST
            if(index === (blogs.length - 1)){
            //if User is true, then the edit panel will be available on hover over blog
                const url = this.state.isUser ? `/blog/${recent._id}/edit`: `/blog/${recent._id}`;
                return (
                    //Returns the blog Div with id from GET and Link to the specific blog post
                        <div className="recent-blog featured" id={recent._id}>
                            <Link to= {url}>
                                <h1>{recent.title}</h1>
                                <h3>{recent.description}</h3>
                                <span>{recent.category}</span>
                            </Link>
                        </div>                    
                )
            }else {
                const url = this.state.isUser ? `/blog/${recent._id}/edit`: `/blog/${recent._id}`;
                return (
                        <div className="aside" id={recent._id}>
                            <Link to= {url}>
                                <h1>{recent.title}</h1>
                                <h3>{recent.description}</h3>
                                <span>{recent.category}</span>
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
            <div className="blog-flex">
            <header>
                <h1>Blog Central</h1>
            </header>
            <div className="blog-flex-central">
                {blogsDisplay}
            </div>
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