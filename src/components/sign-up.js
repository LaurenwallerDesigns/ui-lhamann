import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            redirect: null,
            id: "",
            jwt: null
        }
        this.createOnSubmit = this.createOnSubmit.bind(this);
        this.onChangeCreate = this.onChangeCreate.bind(this);
        this.comparePasswords = this.comparePasswords.bind(this);
    }

    onChangeCreate(e) {
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
            }else if ( id === "form-fname") {
                this.setState({
                    firstName: e.target.value
                })
            } else if ( id === "form-lname"){
                this.setState({
                    lastName: e.target.value
                })
            } else {
                console.log("No matching target Id")
            }
    }

    comparePasswords(e) {
        const pw = this.state.password;
        const value = e.target.value;
        const id = e.target.id;
        if(value === pw) {
            document.getElementById(id).classList.add('accepted');
            console.log('match');
        }else {
            document.getElementById(id).classList.remove('accepted');
            console.log('no match');
        }
    }

    createOnSubmit(e) {
        e.preventDefault();

        console.log("New User Submitted");
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        axios.post('/signup', newUser, {
            withCredentials: true
        })
            .then(res => this.setState({
                                            redirect: `/admin/${res.data.user._id}`,
                                            id: res.data.user._id,
                                            token: res.data.token}));
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
            <div>
                <h2>Create an Account</h2>
                <form onSubmit={this.createOnSubmit}>
                    <div className="form-group"> 
                            <label>Email: </label>
                            <input  type="email"
                                    className="form-control"
                                    id="form-email"
                                    value={this.state.email}
                                    onChange={this.onChangeCreate}
                                    required
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>First Name: </label>
                            <input  type="text"
                                    className="form-control"
                                    id="form-fname"
                                    value={this.state.firstName}
                                    onChange={this.onChangeCreate}
                                    required
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>Last Name: </label>
                            <input  type="text"
                                    className="form-control"
                                    id="form-lname"
                                    value={this.state.lastName}
                                    onChange={this.onChangeCreate}
                                    required
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>Create Password: </label>
                            <input  type="password"
                                    className="form-control"
                                    id="form-password"
                                    value={this.state.password}
                                    onChange={this.onChangeCreate}
                                    required
                                    />
                        </div>
                        <div className="form-group"> 
                            <label>Retype Password </label>
                            <input  type="password"
                                    className="form-control"
                                    id="form-password-retype"
                                    value={this.state.checkPw}
                                    onChange={this.comparePasswords}
                                    required
                                    />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}