import { fetchCart, fetchUser } from "../utils/fetchingLocalStorageData"

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
    user:userInfo,
    uploadedProducts:null,
    cartShow :false,
    cartItems:cartInfo,   

}