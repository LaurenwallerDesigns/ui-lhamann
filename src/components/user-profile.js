import React, { Component } from 'react';
import { Link} from "react-router-dom";
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";



export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            firstName: "",
            isUser: true
        }
    }
    componentDidMount(props) {
        Axios.get('http://localhost:3030/api/user', {
            withCredentials: true
        })
        .then(res => 
            this.setState({
            firstName: res.data.data.firstName
        }))
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