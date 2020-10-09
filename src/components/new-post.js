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
            category: "",
            id: "",
            user_id: "",
            firstName: "",
            redirect: null
        }
        this.onChangePost = this.onChangePost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            user_id: this.props.location.state.user_id,
            firstName: this.props.location.state.firstName
        })
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
            category: this.state.category,
            id: this.state.id
        };

        axios.post(`http://localhost:3030/api/blog`, newPost, {
            withCredentials: true
        })
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
        )
    }
}