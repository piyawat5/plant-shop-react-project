import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"
import { OrderStatusEnum } from "../../components/types/OrderStatus"

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

export const getOrders = (combindSearch?: any) => {
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

            const newData = res.data.filter((item: any) => (item.order_status !== OrderStatusEnum.CURRENT))

            const filterNewData = newData.filter((item: any) => (item.id.toString().includes(combindSearch.search))).filter((item: any) => {
                if (combindSearch.searchOrderStatus) {
                    return item.order_status === combindSearch.searchOrderStatus
                } else {
                    return true
                }
            }
            )

            dispatch(orderIsSuccess({ orders: combindSearch ? filterNewData : newData, msg: "get all orders successfully!" }))

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

            const newData = res.data.filter((item: any) => (item.order_status !== OrderStatusEnum.CURRENT))

            dispatch(orderIsSuccess({ orders: newData, msg: 'get my orders successfully!' }))

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
            const priceCal = body.price * body.quantity
            const newBody = { ...body, price: priceCal }

            await axios.post(`${domain}/order/purchase`, newBody, {
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
export const editOrder = (body: any, next?: () => void) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            await axios.put(`${domain}/order/edit`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(orderIsSuccess({ orders: null, msg: 'Edit order successfully!' }))
            if (next) {
                next()
            }

        } catch (error) {
            dispatch(orderIsFail())
        }
    }
}
export const deleteOrderFromCart = (orderId: number, productId: number, quantity: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            await axios.delete(`${domain}/order/delete/${orderId}?product_id=${productId}&quantity=${quantity}`, {
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

export const deleteOrder = (orderId: number, next?: () => void) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(orderIsFetching())
            const token = localStorage.getItem('TOKEN')
            await axios.delete(`${domain}/order/deleteOrder/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(orderIsSuccess({ orders: null, msg: 'remove order successfully' }))
            if (next) {
                next()
            }


        } catch (error) {
            dispatch(orderIsFail())
        }
    }
}