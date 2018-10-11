import {
    joinRequested,
    messageAdded,
    usersRequested,
  } from "../models/message-types";
  import {
    messageSendRequested,
  } from "../models/index";
  
  export const requestUsers = (send) => send(usersRequested);
  
  export const join = (name) => (dispatch, getState, { send }) => {
    send(joinRequested, { name });
  };
  
  export const sendMessage = (message) => (dispatch, getState, { send }) => {
  
    dispatch({ type: messageSendRequested });
    send(messageAdded, { message });
  };
  
  
  