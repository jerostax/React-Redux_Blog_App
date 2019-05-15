import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPosts = () => {
  return function(dispatch, getState) {
    const promise =  jsonPlaceholder.get('/posts');
    return {
      type: 'FETCH_POST',
      payload: promise
    };
  } 
};
