import React, { Component } from 'react';
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
            blogData: null
        }
    }
    componentDidMount() {
        this.props.displayPosts((data) => {
            this.renderBlogs(data);
        })
    }
    renderBlogs(blog) {
        const blogs = blog
        //Mapping over all the blogData gathered from GET
        blogsDisplay = blogs.map((recent, index) => {
        //This is pulling the most recent blog to be the Featured Blog
        //Eventually would like to add a boolean Featured Button on UPDATE/NEW POST
            if(index === (blogs.length - 1)){
            //if User is true, then the edit panel will be available on hover over blog
                const url = this.props.isUser !== null? `/blog/${recent._id}`: `/blog/${recent._id}`;
                return (
                    //Returns the blog Div with id from GET and Link to the specific blog post
                        <div className="recent-blog featured" id={recent._id} key={index * 4}>
                            <Link to= {url} onClick={() => this.props.getIdOnClick(recent._id)}>
                                <h1>{recent.title}</h1>
                                <h3>{recent.description}</h3>
                                <span>{recent.category}</span>
                            </Link>
                        </div>                    
                )
            }else {
                const url = this.props.isUser !== null ? `/blog/${recent._id}/edit`: `/blog/${recent._id}`;
                return (
                        <div className="aside" id={recent._id} key={index * 4}>
                            <Link to= {url} onClick={() => this.props.getIdOnClick(recent._id)}>
                                <h1>{recent.title}</h1>
                                <h3>{recent.description}</h3>
                                <span>{recent.category}</span>
                            </Link>
                        </div>                    
                )
            }
        })
        this.setState({
            blogData:blog
        })

    }
    render() {
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