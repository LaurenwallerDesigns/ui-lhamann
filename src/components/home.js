import React, { Component } from 'react';

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
            id: this.props.location.state.id,
            firstName: this.props.location.state.firstName
        })
    }
    render() {
        return (
            <div>
                <p>Welcome, {this.state.firstName}!!</p>
            </div>
        )
    }
}