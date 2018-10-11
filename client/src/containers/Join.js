import React, { Component } from "react";
import { connect } from "react-redux";
import { join } from "../actions";

class JoinForm extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: false, name: null };
  }

  onJoinClick = (event) => {
    event.preventDefault();
    const { joinFn } = this.props;
    const { name, valid} = this.state;
    if (valid) {
      return;
    }
    joinFn(name);
  }

  checkName = (event) => {
    const name = event.target.value;
    const valid = name && name.length > 0;
    const { joinFn} = this.props;

    this.setState({ valid, name });

    // if the enter key was pressed and the form is valid, submit it
    if (valid && event.type === "keydown" && event.keyCode === 13) {
      joinFn(name);
    }
  }

  render() {
    const { valid} = this.state;
    

    return (
      <div>
        <input
          type="text"
          maxLength="20"
          placeholder="Your name"
          onKeyDown={this.checkName}
          onChange={this.checkName}
        />
        <button onClick={this.onJoinClick} disabled={valid}>
          Join
        </button>
      </div>
    );
  }
}


export default connect(
  null,
  (dispatch) => ({
    joinFn: (name) => dispatch(join(name)),
  })
)(JoinForm);