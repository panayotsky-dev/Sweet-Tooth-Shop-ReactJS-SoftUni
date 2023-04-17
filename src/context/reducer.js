export const actionType = {
    SET_USER: 'SET_USER',
    SET_Uploded_Products: 'SET_Uploded_Products',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CARTITEMS: 'SET_CARTITEMS',
}
 const reducer = (state,action) => {
    console.log(action)
    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            }
            case actionType.SET_Uploded_Products:
                return {
                    ...state,
                    uploadedProducts: action.uploadedProducts,
                }
            case actionType.SET_CART_SHOW:
                return {
                    ...state,
                    cartShow: action.cartShow,
                }
            case actionType.SET_CARTITEMS:
                 return {
                     ...state,
                    cartItems: action.cartItems,
                }
                  //Check context provider in Component chrome extension to see if the information is added correctly  
        default:
            return state;
    }
};
export default reducer;
 