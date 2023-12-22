/* eslint-disable import/no-anonymous-default-export */

export type LoginState = {
    isFetching: boolean,
    isFalse: boolean,
    msg: string | null;
    authorization: any;
}

const initialState: LoginState = {
    isFetching: false,
    isFalse: false,
    authorization: null,
    msg: ''
}

export default (state = initialState, { type, payload }: any): LoginState => {
    switch (type) {
        case 'LOGIN_FETCHING':
            return { isFetching: true, isFalse: false, authorization: null, msg: null }
        case 'LOGIN_FAIL':
            return { isFetching: false, isFalse: true, authorization: null, msg: null }
        case 'LOGIN_SUCCESS':
            return { isFetching: false, isFalse: false, authorization: payload.authorization, msg: payload.msg }
        case 'LOGOUT_SUCCESS':
            return { isFetching: false, isFalse: false, authorization: null, msg: null }

        default:
            return state
    }
}
