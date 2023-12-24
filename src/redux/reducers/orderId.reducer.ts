/* eslint-disable import/no-anonymous-default-export */

export type OrderIdState = {
    isFetching: boolean,
    isFalse: boolean,
    order: any
}

const initialState: OrderIdState = {
    isFetching: false,
    isFalse: false,
    order: null
}

export default (state = initialState, { type, payload }: any): OrderIdState => {
    switch (type) {
        case 'ORDER_ID_FETCHING':
            return { isFetching: true, isFalse: false, order: null }
        case 'ORDER_ID_FAIL':
            return { isFetching: false, isFalse: true, order: null }
        case 'ORDER_ID_SUCCESS':
            return { isFetching: false, isFalse: false, order: payload }

        default:
            return state
    }
}
