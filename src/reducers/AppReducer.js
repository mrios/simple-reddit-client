export default (
  state = {
    isCollapsed: false
  },
  action
) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,
        isCollapsed: action.payload
      };
    default:
      return state;
  }
};
