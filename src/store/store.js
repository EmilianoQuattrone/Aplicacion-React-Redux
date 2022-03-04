import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

//Actualizar la  extension Redux DevTools desde el chrome para que funcione.
const composeEnhancers =

    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const combinarReducers = combineReducers({

    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

export const store = createStore(

    combinarReducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)