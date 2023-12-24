import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"

export const orderIdIsFetching = () => ({
    type: 'ORDER_ID_FETCHING',
})
export const orderIdIsFail = () => ({
    type: 'ORDER_ID_FAIL',
})
export const orderIdIsSuccess = (payload: any) => ({
    type: 'ORDER_ID_SUCCESS',
    payload
})

export const getOrderById = (id: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIdIsFetching())
            const token = localStorage.getItem('TOKEN')
            const res = await axios.get(`${domain}/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(orderIdIsSuccess(res.data))

        } catch (error) {
            dispatch(orderIdIsFail())
        }
    }
}

