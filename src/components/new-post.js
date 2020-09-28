import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            body: "",
            createdBy: {
            firstName: "",
            lastName: ""
            },
            id: "",
            redirect: null
        }
        this.onChangePost = this.onChangePost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        } else if ( id === "form-fname"){
            this.setState({
                firstName: e.target.value
            })
        } else if ( id === "form-lname"){
            this.setState({
                lastName: e.target.value
            })
        }else {
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
            createdBy: {
            firstName: this.state.firstName,
            lastName: this.state.lastName
            }
        };

        axios.post('http://localhost:3030/blog/create', newPost)
            .then(res => this.setState({
                                            redirect: `/blog/${res.data.data._id}`,
                                            id: res.data.data._id}));
    }
    render() {
        if (this.state.redirect) {
            return <Redirect
            to={{
            pathname: `${this.state.redirect}`,
            state: { id: this.state.id }
          }}
        />
          }
        return (
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
                            <label>First Name: </label>
                            <input  type="text"
                                    className="form-control"
                                    id="form-fname"
                                    value={this.state.firstName}
                                    onChange={this.onChangePost}
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>Last Name: </label>
                            <input  type="text"
                                    className="form-control"
                                    id="form-lname"
                                    value={this.state.lastName}
                                    onChange={this.onChangePost}
                                    />
                        </div>
                        <button type="submit" className="btn btn-primary">Publish</button>
                </form>
            </div>
        )
    }
}