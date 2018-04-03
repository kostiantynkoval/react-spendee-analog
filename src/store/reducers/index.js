import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import snackbar from './snackbar';
import desk from './desk';
import itemChange from './itemChange';

export default combineReducers({
    routing: routerReducer,
    auth,
    snackbar,
    desk,
    itemChange
});