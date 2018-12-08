import * as redux from 'redux';
import thunk from 'redux-thunk';

/* Imports reducers */
// import { subscriptions } from "../reducers/index.jsx";

/* combineReducers */
export var configure = (initialeState = {}) => {
  var reducer = redux.combineReducers({

  });

  var store = redux.createStore(
    reducer,
    initialeState,
    redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
};
