import {
  SELECT_POST,
  DISMISS_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './PostActions'

export default function(
  state = {
    isFetching: false,
    didDismiss: false,
    items: [],
    selectedId: null
  },
  action
) {
  switch (action.type) {
    case SELECT_POST:
      const updatedPosts = state.items.map(obj => {
          return obj.id === action.postId ? { ...obj, unread: false } : obj
        }
      );
      return {
        ...state,
        isFetching: false,
        items: updatedPosts,
        lastUpdated: action.receivedAt,
        selectedId: action.postId
      };
    case DISMISS_POST:
      const filteredPosts = state.items.filter(obj => obj.id !== action.postId)
      return {
        ...state,
        isFetching: false,
        items: filteredPosts,
        lastUpdated: action.receivedAt,
        selectedId: null
      };
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didDismiss: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didDismiss: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}