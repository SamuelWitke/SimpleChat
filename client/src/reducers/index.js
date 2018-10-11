import {
    joinRequested,
    messageAdded,
    userJoined,
    userLeft,
    usersRequested,
  } from "../models/message-types";
  
  const handlers = {
    [joinRequested]: ({ state, payload: currentUser }) => ({
      ...state,
      currentUser,
    }),
    // Note: currentUser is already in users
    [userJoined]: ({ state, payload: user }) => ({
      ...state,
      users: state.users.concat([user]),
    }),
    [messageAdded]: ({ state, payload: message, metadata: { createdAt } }) => ({
      ...state,
      messages: state.messages.concat([{ ...message, createdAt }]),
    }),
    [usersRequested]: ({ state, payload: users }) => ({
      ...state,
      users,
    }),
    [userLeft]: ({ state, payload: { userId } }) => ({
      ...state,
      users: state.users.filter(({ id }) => id !== userId),
    }),
  };
  
  export default (state = {}, { type, payload, metadata }) => {
    const handler = handlers[type];
    if (handler) {
      return handler({ state, payload, metadata });
    }
  
    return state;
  };