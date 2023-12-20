/* eslint-disable import/no-anonymous-default-export */

export type ClearSearchState = {
    clear: string;
}

const initialState = {
    clear: '',
}

export default (state = initialState, { type, payload }: any): ClearSearchState => {
    switch (type) {

        case 'CLEAR':
            return { ...state, clear: '' }

        default:
            return state
    }
}
