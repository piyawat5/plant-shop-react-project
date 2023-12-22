import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"

export const productIdIsFetching = () => ({
    type: 'PRODUCT_ID_FETCHING',
})
export const productIdIsFail = () => ({
    type: 'PRODUCT_ID_FAIL',
})
export const productIdIsSuccess = (payload: any) => ({
    type: 'PRODUCT_ID_SUCCESS',
    payload
})

export const productIdAction = (productId: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(productIdIsFetching())
            const token = localStorage.getItem("TOKEN");
            const res = await axios.get(`${domain}/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(productIdIsSuccess(res.data))

        } catch (error) {
            dispatch(productIdIsFail())
        }
    }
}
