/* eslint-disable import/no-anonymous-default-export */

export type CustomerState = {
    isFetching: boolean,
    isFalse: boolean,
    customer: any,
    msg: string | null,
}

const initialState: CustomerState = {
    isFetching: false,
    isFalse: false,
    customer: null,
    msg: null
}

export default (state = initialState, { type, payload }: any): CustomerState => {
    switch (type) {
        case 'CUSTOMER_FETCHING':
            return { ...state, isFetching: true, isFalse: false, customer: null, msg: null }
        case 'CUSTOMER_FAIL':
            return { ...state, isFetching: false, isFalse: true, customer: null, msg: null }
        case 'CUSTOMER_SUCCESS':
            return { ...state, isFetching: false, isFalse: false, customer: payload.customer, msg: payload.msg }

        default:
            return state
    }
}
