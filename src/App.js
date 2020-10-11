import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';

import './styles/App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from './components/user-profile';
import Nav from './components/nav';
import BlogPost from './components/blog-post';
import NewPost from './components/new-post';
import Blogs from './components/all-blogs';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import About from './components/about';
import LogOut from './components/log-out';
import Settings from './components/settings';
import Footer from './components/footer';

const url = 'http://localhost:3030/api/';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isUser: false,
      id: null
    }
    this.changeUserState = this.changeUserState.bind(this);
    this.onSubmitNewPost = this.onSubmitNewPost.bind(this);
  }
  // componentDidMount {

  //   }
  // componentWillUnmount {

  //   }

  onSubmitNewPost(e, data) {
    e.preventDefault();

    console.log("Form Submitted");
    // const newPost = {
    //     title: this.state.title,
    //     description: this.state.description,
    //     body: this.state.body,
    //     category: this.state.category
    // };
    axios.post(`${url}blog`, data, {
        withCredentials: true
    })
        .then(res => this.setState({
          id: res.data.data._id
        }))
}

  changeUserState() {
    this.setState({
      isUser: true
    })
  }
    render() {
      return (
        <div className="nav">
            <Route path="/" render={()=> <Nav isUser={this.state.isUser}/> }/>
            <Route path="/create" exact render={()=> <NewPost id={this.state.id}
                                                                                      onSubmitNewPost ={this.onSubmitNewPost}
                                                                                      isUser={this.state.isUser}
                                                                                    />} />
             <Route path="/blog/:id" exact render={()=> <BlogPost 
                                                                                            isUser={this.state.isUser}
                                                                                            id={this.state.id}
                                                                                        />}/>                                                                       
            <Route path="/logout" component={LogOut} />
            <Route path="/settings" component={Settings} />
            <Route path="/blogs" render={()=> <Blogs isUser={this.state.isUser}/>} />
            <Route path="/user" render={()=> <UserProfile isUser={this.state.isUser}/> }/>
            <Route path="/user-sign-in" exact render={()=> <SignIn 
                                                                                                    changeUser={this.changeUserState} 
                                                                                                    isUser={this.state.isUser} 
                                                                                                    /> }/>
            <Route path="/user-sign-up" exact render={()=> <SignUp changeUser={this.changeUserState}/> }/>
            <Route path='/' exact component={About} />
            <Route path="/" render={() => <Footer isUser={this.state.isUser} />} />
          </div>
      )
    }
}


export default App;
