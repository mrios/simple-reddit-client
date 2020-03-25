import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_POST = 'SELECT_POST'
export const DISMISS_POST = 'DISMISS_POST'

export function selectPost(postId) {
  return {
    type: SELECT_POST,
    postId
  }
}

export function dismissPost(postId) {
  return {
    type: DISMISS_POST,
    postId
  }
}

function requestPosts(postId) {
  return {
    type: REQUEST_POSTS,
    postId
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchRedditPosts() {
  return dispatch => {
    dispatch(requestPosts())
    // Simple API call, pagination is handle in the front-end
    return fetch(`https://www.reddit.com/top.json?limit=50`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchPosts(state) {
  const posts = state.posts
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didDismiss
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchRedditPosts())
    }
  }
}