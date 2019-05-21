import _ from 'lodash';
import jsonPlaceholder from '../api/jsonPlaceholder';

// ----- SOLUTION 2 PART 1 TO NOT MAKE 100 REQUEST FOR USERS -----

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log('About to fetch posts!');
  await dispatch(fetchPosts());
  console.log('fetched posts!');

  // Map all over our different posts and pull out the 'userId' --- _.uniq find the uniq user id's (return an array)
  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  console.log(userIds);

  userIds.forEach(id => dispatch(fetchUser(id)));
};
// ----- END SOLUTION 2 PART 1 -----

// ----- fetchPosts() available for each solution -----

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};
// ----- END fetchPosts() -----

// ----- SOLUTION 2 PART 2 -----
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};
// ----- END SOLUTION 2 PART 2 -----

// ----- SOLUTION 1 TO NOT MAKE 100 REQUEST FOR USERS -----

// --- Good without refacto :

// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };

// ===

// --- Same but with refacto :
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// --- Then

// --- Memoized fetchUser fx to make 1 request per user

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });

// ---- END SOLUTION 1 -----
