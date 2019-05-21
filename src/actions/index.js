import _ from 'lodash';
import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

// SOLUTION 1 TO NOT MAKE 100 REQUEST FOR USERS

// Good without refacto
// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };

// Same but with refacto
export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// Memoized fetchUser fx to make 1 request per user
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
});
