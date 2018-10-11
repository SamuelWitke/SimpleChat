import React, { Component } from "react";
import { sendMessage } from "../actions";
import { connect } from "react-redux";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: false, name: null };
  }

  onSendClick = (event) => {
    event.preventDefault();
    const { message, valid, } = this.state;
    const { sendMessageFn } = this.props;
    if (!valid || !message || message.length === 0) {
      return;
    }

    sendMessageFn(message);
    this.setState({ valid: false, message: "" });
  }

  onChange = (event) => {
    const message = event.target.value;
    const valid = message && message.length > 0;
    this.setState({ valid, message });
  }

  onKeyDown = (event) => {
    if (event.key === "Enter") {
      return this.onSendClick(event);
    }
  }

  render() {
    const { valid } = this.state;

    return (
      <div>
        <input
          className="send-message-form-input"
          placeholder="Say something nice"
          maxLength="200"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <button onClick={this.onSendClick} disabled={!valid}>
          Send
        </button>
      </div>
    );
  }
}

export default connect(
  null,
(dispatch) => ({
  sendMessageFn: (message) => dispatch(sendMessage(message)),
})
)(SendMessageForm);