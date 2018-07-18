import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  logger
];

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
