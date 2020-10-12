import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import NotAuth from './not-auth';

//ONLY FOR ISUSER(TRUE)
export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            body: "",
            category: "",
            id: null
        }
        this.onChangePost = this.onChangePost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
    }
    onChangePost(e) {
        const id = e.target.id;
        if(id === "form-title") {
            this.setState({
                title: e.target.value
            })
        } else if (id === "form-desc") {
            this.setState({
                description: e.target.value
            })
        } else if ( id === "form-body") {
            this.setState({
                body: e.target.value
            })
        }else if(id === "category") {
            this.setState({
                category: this.state.category
            })
        }   else {
            console.log("No matching target Id")
        }
    }

    onSubmit(e) {
        e.preventDefault();

        console.log("Form Submitted");
        const newPost = {
            title: this.state.title,
            description: this.state.description,
            body: this.state.body,
            category: this.state.category
        };

        this.props.onSubmitNewPost(e, newPost, (id) => {
            this.setState({
                id: id
            });
        } );
    }
    render() {
        if (this.state.id !== null) {
            return <Redirect
            to={{
            pathname: `/blog/${this.state.id}`
          }}
        />
          }
        return (
            (this.props.isUser ?
                <div>
                <h2>New Blog Post</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                            <label>Title: </label>
                            <input  type="text"
                                    className="form-control"
                                    id="form-title"
                                    value={this.state.title}
                                    onChange={this.onChangePost}
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>Description: </label>
                            <input  type="text"
                                    className="form-control"
                                    id="form-desc"
                                    value={this.state.description}
                                    onChange={this.onChangePost}
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>Body: </label>
                            <textarea  type="text"
                                    className="form-control"
                                    id="form-body"
                                    value={this.state.body}
                                    onChange={this.onChangePost}
                                    />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Choose a category:</label>
                            <select id="category" onChange={this.onChangePost}>
                            <option value="web-development">Web Development</option>
                            <option value="personal">Personal</option>
                            <option value="parenting">Parenting</option>
                            <option value="mental-health">Mental Health</option>
                            <option value="hobbies">Hobbies</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Publish</button>
                </form>
            </div>
            : 
            <NotAuth />
                )
        )
    }
}