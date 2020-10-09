import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            firstName: ""
        }
    }
    componentDidMount(props) {
        this.setState({
            firstName: this.props.location.state.firstName,
            id: this.props.location.state.id
        })
    }
    render() {
        const url = `/user/blog/create`;
        return (
            <div>
                <p>Welcome, {this.state.firstName}!!</p>
                <Link to= {{
                    pathname: `${url}`,
                    state: {
                        user_id: this.state.id,
                        firstName: this.state.firstName
                    }
                }}>
                        <h1> create new blog post</h1>
                </Link>
            </div>
        )
    }
}