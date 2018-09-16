import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input, Message } from 'semantic-ui-react'

class App extends Component {

    state = {
        input: "",
        messages: [],
        connection: new WebSocket('ws://127.0.0.1:1337')
    }

    componentWillMount() {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        // if browser doesn't support WebSocket, just show some notification and exit
        if (!window.WebSocket) {
            alert("Browser Not Supported");
        }
    }


    componentDidMount() {
        const { connection } = this.state;
        const _this = this;
        connection.onopen = function() {
            // first we want users to enter their names
        };

        connection.onerror = function(error) {
        };

        // most important part - incoming messages
        connection.onmessage = function(message) {
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                return;
            }
             if (json.type === 'history') { // entire message history
                _this.setState({ messages: json.data })
             }
            
             if (json.type === 'message') { // it's a single message
                const { messages } = _this.state;
                messages.push(json.data);
                _this.setState({ messages })
            }
        };


    }
    onChange = (e) => {
        this.setState({ input: e.target.value })
    }

    inputSubmit = () => {
        const { input, connection } = this.state;
        connection.send(input);
    }

    render() {
        const { input, messages } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <ul>

                    {messages.map( (message, i) => (
                      <li key={i}>
                        <Message color={message.color}>{message.text}</Message>
                      </li>
                    ))}
                </ul>
                <Input action={{ icon: 'send', onClick: this.inputSubmit }} onChange={this.onChange} value={input} placeholder='Send Message...' />
            </div>
        );
    }
}

export default App;
