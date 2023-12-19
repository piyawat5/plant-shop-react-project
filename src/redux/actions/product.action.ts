import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain, token } from "../../utils/const"

export const ProductIsFetching = () => ({
    type: 'PRODUCT_FETCHING',
})
export const ProductIsFail = () => ({
    type: 'PRODUCT_FAIL',
})
export const ProductIsSuccess = (payload: any) => ({
    type: 'PRODUCT_SUCCESS',
    payload
})

export const ProductAction = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(ProductIsFetching())

            const res = await axios.get(`${domain}/product`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(ProductIsSuccess(res.data))
            console.log(res.data)

        } catch (error) {
            dispatch(ProductIsFail())
        }
    }
}

// export const ProductPostAction = () => {
//     return async (dispatch: Dispatch<AnyAction>) => {
//         try {
//             //is fetching
//             dispatch(ProductIsFetching())

//              await axios.post(`${domain}/product`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             dispatch(ProductIsSuccess(res.data))
//             console.log(res.data)

//         } catch (error) {
//             dispatch(ProductIsFail())
//         }
//     }
// }