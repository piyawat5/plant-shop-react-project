/* eslint-disable import/no-anonymous-default-export */

export type ProductIdState = {
    isFetching: boolean,
    isFalse: boolean,
    product: any,
}

const initialState: ProductIdState = {
    isFetching: false,
    isFalse: false,
    product: null,
}

export default (state = initialState, { type, payload }: any): ProductIdState => {
    switch (type) {
        case 'PRODUCT_ID_FETCHING':
            return { ...state, isFetching: true, isFalse: false, product: null }
        case 'PRODUCT_ID_FAIL':
            return { ...state, isFetching: false, isFalse: true, product: null }
        case 'PRODUCT_ID_SUCCESS':
            return { ...state, isFetching: false, isFalse: false, product: payload }

        default:
            return state
    }
}
