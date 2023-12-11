/* eslint-disable import/no-anonymous-default-export */

export type RegisterState = {
    isFetching: boolean,
    isFalse: boolean,
    msg: string
}

const initialState: RegisterState = {
    isFetching: false,
    isFalse: false,
    msg: ''
}

export default (state = initialState, { type, payload }: any): RegisterState => {
    switch (type) {
        case 'test':
            return { isFetching: true, isFalse: false, msg: payload }
        case 'test2':
            return { isFetching: false, isFalse: true, msg: payload }
        case 'test3':
            return { isFetching: false, isFalse: false, msg: payload }

        default:
            return state
    }
}
