import {combineReducers} from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import authorReducer from './authorReducer';
import genreReducer from './genreReducer';

export default combineReducers({
  auth: authReducer,
  book: bookReducer,
  author: authorReducer,
  genre: genreReducer,
});
