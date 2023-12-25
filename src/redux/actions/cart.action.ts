import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"

export const cartIsFetching = () => ({
    type: 'CART_FETCHING',
})
export const cartIsFail = () => ({
    type: 'CART_FAIL',
})
export const cartIsSuccess = (payload: any) => ({
    type: 'CART_SUCCESS',
    payload
})

export const getCart = (customerId: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(cartIsFetching())
            const token = localStorage.getItem('TOKEN')
            const myOrders = await axios.get(`${domain}/order/myOrder/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const order = myOrders.data.find((order: any) => order.order_status === 'CURRENT')

            const res = await axios.get(`${domain}/order/${order.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let products = res.data?.orderDetail.map((item: any) => {
                let calPrice = item.product.price * item.quantity
                return { ...item, price: calPrice }
            })
            const newData = { ...res.data, orderDetail: [...products] }

            dispatch(cartIsSuccess(newData))

        } catch (error) {
            dispatch(cartIsFail())
        }
    }
}

