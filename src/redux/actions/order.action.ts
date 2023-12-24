import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"

export const orderIsFetching = () => ({
    type: 'ORDER_FETCHING',
})
export const orderIsFail = () => ({
    type: 'ORDER_FAIL',
})
export const orderIsSuccess = (payload: any) => ({
    type: 'ORDER_SUCCESS',
    payload
})

export const getOrders = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            const res = await axios.get(`${domain}/order`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(orderIsSuccess({ orders: res.data, msg: "get all orders successfully!" }))

        } catch (error) {
            dispatch(orderIsFail())
        }
    }
}

export const getMyOrders = (customerId: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            const res = await axios.get(`${domain}/order/myOrder/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(orderIsSuccess({ orders: res.data, msg: 'get my orders successfully!' }))

        } catch (error) {
            dispatch(orderIsFail())
        }
    }
}

export const postOrders = (body: any) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            await axios.post(`${domain}/order/purchase`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(orderIsSuccess({ orders: null, msg: 'Add product to cart successfully!' }))

        } catch (error) {
            dispatch(orderIsFail())
        }
    }
}
export const editOrder = (customerId: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            await axios.put(`${domain}/order/edit`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(orderIsSuccess({ orders: null, msg: 'Edit order successfully!' }))

        } catch (error) {
            dispatch(orderIsFail())
        }
    }
}
export const deleteOrderId = (orderId: number, productId: number, quantity: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            const res = await axios.delete(`${domain}/order/delete/${orderId}?product_id=${productId}&quantity=${quantity}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(orderIsSuccess({ orders: null, msg: 'remove product from cart successfully' }))

        } catch (error) {
            dispatch(orderIsFail())
        }
    }
}
