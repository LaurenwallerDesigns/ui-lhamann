import Axios from 'axios';
import React, { Component } from 'react';
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
            createdBy: {
                firstName: "",
                lastName: ""
            }
        }
    }
    componentDidMount() {
        const url = `http://localhost:3030/blog/${this.props.match.params.id}`;
        Axios.get(url)
        .then(res => {
            this.setState({
                title: res.data.data.title,
                description: res.data.data.description,
                body: res.data.data.body,
                category: res.data.data.category,
                date: res.data.data.createdAt
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
    render() {
        return (
            <div>
                {display}
                <h1>{this.state.title}</h1>
                <h2>{this.state.description}</h2>
                <span className="date">{this.state.date}</span>
                <span className="author">{this.state.firstName} {this.state.lastName}</span>
                <span className="category">{this.state.category}</span>
                <p>{this.state.body}</p>
            </div>
        )
    }
}