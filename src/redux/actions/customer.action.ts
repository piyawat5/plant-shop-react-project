import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"

export const customerIsFetching = () => ({
    type: 'CUSTOMER_FETCHING',
})
export const customerIsFail = () => ({
    type: 'CUSTOMER_FAIL',
})
export const customerIsSuccess = (payload: any) => ({
    type: 'CUSTOMER_SUCCESS',
    payload
})

export const getCustomerById = (id: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(customerIsFetching())
            const token = localStorage.getItem("TOKEN");
            const res = await axios.get(`${domain}/customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(customerIsSuccess({ customer: res.data, msg: '' }))

        } catch (error) {
            dispatch(customerIsFail())
        }
    }
}

export const editCustomerAction = (body: any, next?: () => void) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(customerIsFetching())
            const token = localStorage.getItem("TOKEN");
            const res = await axios.put(`${domain}/customer/edit`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(customerIsSuccess({ customer: null, msg: res.data.msg }))
            if (next) {
                next()
            }

        } catch (error) {
            dispatch(customerIsFail())
        }
    }
}
