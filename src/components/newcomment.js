import React, { Component }  from 'react';
import axios from 'axios';

export default class NewComment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title:"",
            firstName: "",
            body: ""
        }
        this.submitComment = this.submitComment.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        })
    }

    onChange(e) {
        const id = e.target.id;
        if(id === "form-title") {
            this.setState({
                title: e.target.value
            })
        } else if ( id === "form-body") {
            this.setState({
                body: e.target.value
            })
        } else if ( id === "form-firstName"){
            this.setState({
                firstName: e.target.value
            })
        }else {
            console.log("No matching target Id")
        }
    }

    submitComment(e) {
        e.preventDefault();

        console.log("Comment Submitted");
        const newComment = {
            title: this.state.title,
            body: this.state.body,
            firstName: this.state.firstName,
            id: this.state.id
        };

        axios.post('http://localhost:3030/blog/:id', newComment, {
            withCredentials: true
        })
            .then(res => console.log("worked"));
    }
    render() {
        return (
            <div className="new-comment-post">
            <h2>New Comment</h2>
            <form onSubmit={this.submitComment}>
                <div className="form-group"> 
                    <label>Title: </label>
                    <input  type="text"
                            className="form-control"
                            id="form-title"
                            value={this.state.title}
                            onChange={this.onChange}
                            />
                </div>
                <div className="form-group"> 
                    <label>First Name: </label>
                    <input  type="text"
                            className="form-control"
                            id="form-firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                            />
                </div>
                <div className="form-group"> 
                    <label>Body: </label>
                    <textarea  type="text"
                            className="form-control"
                            id="form-body"
                            value={this.state.body}
                            onChange={this.onChange}
                            />
                </div>
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
            </div>
        )
    }
}