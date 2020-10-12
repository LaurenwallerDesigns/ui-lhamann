import React, { Component } from "react";
import { Route, Redirect} from "react-router-dom";
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
import Error from './components/error-boundary';

const url = 'http://localhost:3030/';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: null,
      error:null,
      errorMessage: null
    }
    this.onSubmitNewPost = this.onSubmitNewPost.bind(this);
    this.displayPost = this.displayPost.bind(this);
    this.getIdOnClick = this.getIdOnClick.bind(this);
    this.displayBlogs = this.displayBlogs.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.submitSignIn = this.submitSignIn.bind(this);
  }
  // componentDidMount {

  //   }
  // componentWillUnmount {

  //   }

//NEW POST (POST)
  onSubmitNewPost(e, data, callback) {
    e.preventDefault();
    console.log("Form Submitted");
    axios.post(`${url}api/blog`, data, {
        withCredentials: true
    })
        .then(res => { 
          this.setState({
            id: res.data.data._id
          });
          // callback to send id to NewPost and setState for redirection path
          callback(res.data.data._id);
        }
      )
      .catch(err => {
        if(err.response){
          this.setState({
            error: true,
            errorMessage: err.response.data.message
          })
        }else if(err.request){
          this.setState({
            error: true,
            errorMessage: err.request.data.message
          })
        }else{
          this.setState({
            error: true,
            errorMessage: err.data.message
          })
        }
      })
    }

    //GET for displaying each post
    displayPost(callback){
      const tag =  this.state.user_id === null ? 'blog/': 'api/blog/';
      axios.get(`${url}${tag}${this.state.id}`, {
        withCredentials: true
      })
      .then(res => callback(res.data.data, res.status))
      .catch(err => {
        if(err.response){
          this.setState({
            error: true,
            errorMessage: err.response.data.message
          })
        }else if(err.request){
          this.setState({
            error: true,
            errorMessage: err.request.data.message
          })
        }else{
          this.setState({
            error: true,
            errorMessage: err.data.message
          })
        }
      })
    }

 //get all blogs
    displayBlogs(callback){
      console.log('ran');
      //check isUser then append correct routing tag to url
      const tag = this.state.user_id === null ? 'blog': 'api/blog/user';
      console.log(url,tag);
      axios.get( `${url}${tag}`, {
        withCredentials: true
      })
      .then(res => {callback(res.data.data)
      console.log(res.data.data)})
      .catch(err => {
        if(err.response){
          this.setState({
            error: true,
            errorMessage: err.response.data.message
          })
        }else if(err.request){
          this.setState({
            error: true,
            errorMessage: err.request.data.message
          })
        }else{
          this.setState({
            error: true,
            errorMessage: err.data.message
          })
        }
      })
    }

//setting state on click from allblogs to display correct blog id
    getIdOnClick(id) {
      console.log(id);
      this.setState({
        id: id
      });
    }

//On signin Submit Verify data
submitSignIn(e, data, callback) {
  e.preventDefault();
  axios.post(`${url}signin`, data, {
      withCredentials: true
  })
      .then(res => this.setState({
        user_id: 1
      }))
      .catch(err => {
        if(err.response){
          this.setState({
            error: true,
            errorMessage: err.response.data.message
          })
        }else if(err.request){
          this.setState({
            error: true,
            errorMessage: err.request.data.message
          })
        }else{
          this.setState({
            error: true,
            errorMessage: err.data.message
          })
        }
      })
}
  //get user data on signin/signup
  //sendback data needed
  getUserData(callback) {
    axios.get(`${url}api/user`, {
      withCredentials: true
    })
    .then(res => { 
      this.setState({
        user_id: res.data.data._id
      })
      callback(res.data.data)})
      .catch(err => {
        if(err.response){
          this.setState({
            error: true,
            errorMessage: err.response.data.message
          })
        }else if(err.request){
          this.setState({
            error: true,
            errorMessage: err.request.data.message
          })
        }else{
          this.setState({
            error: true,
            errorMessage: err.data.message
          })
        }
      })
  }

    render() {
      console.log(this.state.user_id);
      if(this.state.error){
        return <Redirect to="/error" />
      }
      return (
        <div className="nav">
            <Route path="/" render={(props)=> <Nav isUser={this.state.user_id} {...props}
            /> }/>
            <Route path="/create" exact render={()=> <NewPost
                                                                                      onSubmitNewPost ={this.onSubmitNewPost}
                                                                                      isUser={this.state.user_id}
                                                                                    />} />
             <Route path="/blog/:id" exact render={()=> <BlogPost 
                                                                                            isUser={this.state.user_id}
                                                                                            displayPost={this.displayPost}
                                                                                        />}/>                                                                       
            <Route path="/logout" component={LogOut} />
            <Route path="/settings" component={Settings} />
            <Route path="/blogs" render={()=> <Blogs 
                                                                              isUser={this.state.user_id}
                                                                              getIdOnClick={this.getIdOnClick}
                                                                              displayPosts={this.displayBlogs}
                                                                              />} />
            <Route path="/user" render={()=> <UserProfile 
                                                                            getData = {this.getUserData}
                                                                            isUser={this.state.user_id}/> }/>
            <Route path="/user-sign-in" exact render={()=> <SignIn 
                                                                                                  isUser={this.state.user_id}
                                                                                                  submit={this.submitSignIn} 
                                                                                                /> }/>
            <Route path="/user-sign-up" exact render={()=> <SignUp
                                                                                                    isUser={this.state.user_id}
                                                                                                /> }/>
            <Route path='/' exact component={About} />
            <Route path="/" exact render={() => <Footer isUser={this.state.user_id} />} />
            <Route path="/error" exact render={() => <Error error={this.state.error} errorMessage={this.state.errorMessage} />} />
          </div>
      )
    }
}


export default App;
