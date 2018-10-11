import React  from 'react';
import './App.css';
import Join from './containers/Join';
import Message from './containers/Message';
import MessageList from './containers/MessageList';
import Users from './containers/Users'
import { connect } from "react-redux";
import logo from './logo.svg';


const App = ({currentUser})=>{
    return (
      <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
      <section id="page">
      <header className="">
       <Users/></header>
    <nav>{!currentUser ? <Join/> : <Message/>}</nav>
        <main><MessageList/></main>
      </section>
      </div>
    );
  }

export default connect(
  ({currentUser}) => ({currentUser})
  )(App);
