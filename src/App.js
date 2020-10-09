import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './styles/App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/home';
import Index from './components/home-index';
import BlogPost from './components/blog-post';
import NewPost from './components/new-post';
import Blogs from './components/all-blogs';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  // componentDidMount {

  //   }
  // componentWillUnmount {

  //   }

    render() {
      return (

        <Router>
          <Route path="/"  exact render={(props)=> <Index{...props}/>} />
          <Route path="/blog/:id" render={(props) => <BlogPost{...props}/>}/>
          <Route path="/user/blog/create" component={NewPost} />
          <Route path="/blogs" render={(props)=> <Blogs{...props}/>} />
          <Route path="/user/:id" render={(props) => <Home{...props}/>}/>
          <Route path="/user-sign-in" component={SignIn} />
          <Route path="/user-sign-up" component={SignUp} />
        </Router>
      )
    }
}


export default App;
