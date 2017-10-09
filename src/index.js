import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const imagesReducer = (state = [], action) => {
  return state
}

const searchQueryReducer = (state = "", action) => {
  return state
}

const allReducers = combineReducers({
  images: imagesReducer,
  searchQuery: searchQueryReducer
})

const store = createStore(allReducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
