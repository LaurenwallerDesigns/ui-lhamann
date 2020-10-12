import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";



export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            firstName: "",
            user_id: this.props.isUser,
            email: ""
        }
    }
    componentDidMount(props) {
        this.props.getData((data) => {
            this.setState({
                firstName: data.firstName,
                email: data.email
            })
        })
    }

    getBlogs() {

    }
    render() {

        return (
                    <div className="user-profile">
                        <h1>{this.state.firstName}'s  Profile</h1>
                    </div>
        )
    }
}