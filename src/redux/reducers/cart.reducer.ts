/* eslint-disable import/no-anonymous-default-export */

export type CartState = {
    isFetching: boolean,
    isFalse: boolean,
    order: any;
}

const initialState: CartState = {
    isFetching: false,
    isFalse: false,
    order: null,
}

export default (state = initialState, { type, payload }: any): CartState => {
    switch (type) {
        case 'CART_FETCHING':
            return { isFetching: true, isFalse: false, order: null, }
        case 'CART_FAIL':
            return { isFetching: false, isFalse: true, order: null, }
        case 'CART_SUCCESS':
            return { isFetching: false, isFalse: false, order: payload }

        default:
            return state
    }
}
