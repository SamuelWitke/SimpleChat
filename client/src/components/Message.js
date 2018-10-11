import React from "react";
import timeSince from '../utils/timeSince';

export default ({ name, createdAt, message }) => (
  <div className="message">
    <span style={name && { marginRight: "5px" }}>{name && name + ":"}</span>
    <span className="text">{message}</span>
    <span className="created-at">{timeSince(createdAt)}</span>
  </div>
);
