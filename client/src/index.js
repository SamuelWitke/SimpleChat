import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setupStore from './store/index';
import { Provider } from "react-redux";
import Error from './components/Error';

setupStore.then((store) => {
  console.log("store rendered");
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
  document.getElementById('root'))
  }).catch( (e) => {
    return (
  ReactDOM.render(
  <Error error ={e.toString()}/>,
  document.getElementById('root'))
    )
  });



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
