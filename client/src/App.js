import React, { Component } from 'react';
import './App.css';
import Join from './containers/Join';
import Message from './containers/Message';
import MessageList from './containers/MessageList';

class App extends Component {
 render() {
    return (
      <section id="page">
        <header>Header</header>
        <nav><Join/><Message/></nav>
        <main><MessageList/></main>
      </section>
    );
  }
}

export default App;
