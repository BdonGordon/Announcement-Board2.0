import { combineReducers } from 'redux';
import { messageBoardReducer } from '../modules/messageBoard';

const makeRootReducer = combineReducers({
    messageBoard: messageBoardReducer
});

export default makeRootReducer;