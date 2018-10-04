import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger'
import reducers from "../reducers";
import thunk from "redux-thunk";

const logger = createLogger({
  collapsed: true
});

export default createStore(
  reducers,
  applyMiddleware(thunk, logger)
);
