/* eslint-disable import/no-anonymous-default-export */

export type OrderState = {
    isFetching: boolean;
    isFalse: boolean;
    orders: any;
    msg: string;
}

const initialState: OrderState = {
    isFetching: false,
    isFalse: false,
    orders: null,
    msg: '',
}

export default (state = initialState, { type, payload }: any): OrderState => {
    switch (type) {
        case 'ORDER_FETCHING':
            return { isFetching: true, isFalse: false, orders: null, msg: '' }
        case 'ORDER_FAIL':
            return { isFetching: false, isFalse: true, orders: null, msg: '' }
        case 'ORDER_SUCCESS':
            return { isFetching: false, isFalse: false, orders: payload.orders, msg: payload.msg }

        default:
            return state
    }
}
