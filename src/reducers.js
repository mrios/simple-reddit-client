import { combineReducers } from 'redux'
import {
  SELECT_POST,
  DISMISS_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './actions'

function posts(
  state = {
    isFetching: false,
    didDismiss: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case SELECT_POST:
      return Object.assign({}, state, {
        unread: false
      })
    case DISMISS_POST:
      return Object.assign({}, state, {
        didDismiss: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didDismiss: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didDismiss: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsReducer(state = {}, action) {
  switch (action.type) {
    case DISMISS_POST:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        posts: posts(state[action.postId], action)
      })
    default:
      return state
  }
}

const rootReducer = postsReducer

export default rootReducer