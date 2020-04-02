export const TOGGLE_MENU = "TOGGLE_MENU";

export function toggleMenu(object) {
  return {
    type: TOGGLE_MENU,
    payload: object
  };
}
