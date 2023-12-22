/* eslint-disable import/no-anonymous-default-export */

export type RegisterState = {
    isFetching: boolean,
    isFalse: boolean,
    msg: string | null;
}

const initialState: RegisterState = {
    isFetching: false,
    isFalse: false,
    msg: ''
}

export default (state = initialState, { type, payload }: any): RegisterState => {
    switch (type) {
        case 'REGISTER_FETCHING':
            return { isFetching: true, isFalse: false, msg: null }
        case 'REGISTER_FAIL':
            return { isFetching: false, isFalse: true, msg: null }
        case 'REGISTER_SUCCESS':
            return { isFetching: false, isFalse: false, msg: payload }

        default:
            return state
    }
}
