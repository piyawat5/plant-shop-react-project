/* eslint-disable import/no-anonymous-default-export */

export type ProductsState = {
    isFetching: boolean,
    isFalse: boolean,
    products: any[],
}

const initialState: ProductsState = {
    isFetching: false,
    isFalse: false,
    products: [],
}

export default (state = initialState, { type, payload }: any): ProductsState => {
    switch (type) {
        case 'PRODUCT_FETCHING':
            return { isFetching: true, isFalse: false, products: [] }
        case 'PRODUCT_FAIL':
            return { isFetching: false, isFalse: true, products: [] }
        case 'PRODUCT_SUCCESS':
            return { isFetching: false, isFalse: false, products: payload }

        default:
            return state
    }
}
