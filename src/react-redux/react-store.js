// // store.js
// import { createStore,applyMiddleware } from 'redux';
// import rootReducer from './rootReducer';
// const store = createStore(rootReducer);

// export default store ;



// store.js
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer';

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['myAction'] // Specify any actions/types to ignore while persisting
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create an array of middlewares (if you have other middlewares, add them here)
const middlewares = []; // Add other middlewares if needed

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };

