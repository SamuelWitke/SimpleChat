import React, { Component } from "react";
import { connect } from "react-redux";

class MessageList extends Component {
  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    const { users } = this.props;

    return (
      <div className="message-list">
        <strong>Users In Chat</strong>
        <div
          className="messages-list"
          ref={(e) => {
            this.messageList = e;
          }}
        >
        <ul>
          {users.map(({name},i) => (
            <li key={i}>
            {name}
           </li>
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default connect(
({ users }) => ({ users })
)(MessageList);