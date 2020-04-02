import fetch from "cross-fetch";

export const FETCH_POSTS = "FETCH_POSTS";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_POST = "SELECT_POST";
export const DISMISS_POST = "DISMISS_POST";
export const DISMISS_ALL = "DISMISS_ALL";

export function selectPost(postId) {
  return {
    type: SELECT_POST,
    payload: postId
  };
}

export function dismissPost(postId) {
  return {
    type: DISMISS_POST,
    payload: postId
  };
}

export function dismissAll() {
  return {
    type: DISMISS_ALL,
    payload: []
  };
}

function requestPosts() {
  return {
    type: REQUEST_POSTS,
    payload: null
  };
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    items: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

const warningOccurred = (error, url) => {
  console.log(`There was an error: ${error}, tring to fetch url: ${url}`);
};

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    const url = `https://www.reddit.com/top.json?limit=50`;
    // Simple API call, pagination is handle in the front-end
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
      .catch(error => {
        dispatch(warningOccurred(error, url));
      });
  };
}

export function fetchPostsIfNeeded() {
  return dispatch => {
    return dispatch(fetchPosts());
  };
}
