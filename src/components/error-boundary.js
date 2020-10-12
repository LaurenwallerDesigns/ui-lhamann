import React from 'react';

export default class Error extends React.Component{
    constructor(props) {
        super(props);
        this.state={
           error: this.props.error
        }
    }
     //error handling 

  static getDerivedStateFromError(error) {
    return {errMessage: error.message}
  }

  componentDidCatch(error, info){
    console.log(error, info)
  }
  render() {
      return <h1>Oops! {this.props.errorMessage}</h1>;
  }
}