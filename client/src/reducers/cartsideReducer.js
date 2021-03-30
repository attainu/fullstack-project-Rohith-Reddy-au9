export const cartSideReducer = (state = false, action) => {
    switch (action.type) {
        case "CART_SIDE_VIEW":
        return action.payload;
    default:
        return state;
    }
  };