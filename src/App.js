import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/home';
import BlogPost from './components/blog-post';
import NewPost from './components/new-post';
import SignUp from './components/sign-up';
import Blogs from './components/all-blogs';
import SignIn from './components/sign-in';

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
          <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Lauren's Routes</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                  <Link to="/sign-in" className="nav-link">Sign-In</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/sign-up" className="nav-link">Sign-Up</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/blogs" className="nav-link">All Blogs</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/blog-create" className="nav-link">New Blog Post</Link>
                </li>
              </ul>
            </div>
          </nav>
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/blog/:id" render={(props) => <BlogPost{...props}/>}/>
          <Route path="/blog-create" component={NewPost} />
          <Route path="/blogs" render={(props)=> <Blogs{...props}/>} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
        </Router>
      )
    }
  
}


export default App;
