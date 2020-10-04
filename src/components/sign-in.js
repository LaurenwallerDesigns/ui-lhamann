import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: null,
            id: "",
            firstName: ""
        }
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const id = e.target.id;
        if(id === "form-email") {
            this.setState({
                email: e.target.value
            })
        } else if (id === "form-password") {
            this.setState({
                password: e.target.value
            })
        } else if (id === "form-password-retype") {
            this.setState({
                retypePw: e.target.value
            })
        }else {
            console.log("No matching target Id")
        }
}

submit(e) {
    e.preventDefault();

    console.log("sign-in");
    const checkUser = {
        email: this.state.email,
        password: this.state.password
    };

    axios.post('http://localhost:3030/signin', checkUser)
        .then(res => this.setState({
                                        redirect: `/admin/${res.data.data._id}`,
                                        id: res.data.data._id,
                                    firstName: res.data.data.firstName}));
}
    render() {
        if (this.state.redirect) {
            return <Redirect
            to={{
            pathname: `${this.state.redirect}`,
            state: { id: this.state.id,
                        firstName: this.state.firstName }
          }}
        />
        }
        return (
            <div className="admin-signin">
                <h2>Admin Sign-In</h2>
                <form onSubmit={this.submit}>
                    <div className="form-group"> 
                            <label>Email: </label>
                            <input  type="email"
                                    className="form-control"
                                    id="form-email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>Password: </label>
                            <input  type="password"
                                    className="form-control"
                                    id="form-password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    required
                                    />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        )
    }
}