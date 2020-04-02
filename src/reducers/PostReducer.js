import {
  FETCH_POSTS,
  SELECT_POST,
  DISMISS_POST,
  DISMISS_ALL,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from "./../actions/PostActions";

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
    case FETCH_POSTS:
      const data = action.payload;

      const newObject = {
        items: [...state.items, ...data.items]
      };

      return {
        ...state,
        ...newObject
      };
    case SELECT_POST:
      const updatedPosts = state.items.map(obj => {
        return obj.id === action.payload ? { ...obj, unread: false } : obj;
      });
      return {
        ...state,
        isFetching: false,
        items: updatedPosts,
        lastUpdated: action.receivedAt,
        selectedId: action.payload
      };
    case DISMISS_POST:
      const filteredPosts = state.items.filter(
        obj => obj.id !== action.payload
      );
      return {
        ...state,
        isFetching: false,
        items: filteredPosts,
        lastUpdated: action.receivedAt,
        selectedId: null
      };
    case DISMISS_ALL:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        lastUpdated: action.receivedAt,
        selectedId: null
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didDismiss: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didDismiss: false,
        items: action.items,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}
