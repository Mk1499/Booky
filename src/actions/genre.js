import {SETGENRES} from './types';

export const setGenres = (genres) => (dispach) => {
  console.log('Setting Genres in Store : ', genres);
  dispach({
    type: SETGENRES,
    payload: genres,
  });
};
