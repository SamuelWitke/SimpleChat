import logger from 'redux-logger'
import { createStore,  applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from "redux-thunk";
import { setupWebsocket } from "../sockets";
import { requestUsers } from "../actions";

export default () => {
    const initialState = {
        messages: [],
        users: [],
        currentUser: null,
    };

    return setupWebsocket().then(({ send, receive }) => {
        const middleware=[thunkMiddleware.withExtraArgument({ send }), logger];

        const store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(...middleware),
        );

        receive(store.dispatch);
        requestUsers(send);
        return store;
    });
};