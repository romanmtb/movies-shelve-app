import React from 'react';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

console.log('hello', '---');

const getAll = () => 
    fetch(
		`http://localhost:4125/api/movies`
    ).then(res => res.json())
    .then(data => console.log( data ))

    getAll()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
