import React, { Component } from "react";
import Message from "../components/Message";
import { connect } from "react-redux";

class MessageList extends Component {
  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="message-list">
        <strong>Messages</strong>
        <div
          className="messages-list"
          ref={(e) => {
            this.messageList = e;
          }}
        >
          {messages.map(({ id, user, message, createdAt },i) => (
            <span key={i}>
            <Message
              key={id}
              name={user && user.name}
              createdAt={createdAt}
              message={message}
            />
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
({ messages }) => ({ messages })
)(MessageList);