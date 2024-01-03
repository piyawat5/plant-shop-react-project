/* eslint-disable import/no-anonymous-default-export */

export type UploadState = {
    isFetching: boolean,
    isFalse: boolean,
    isSuccess: any;
}

const initialState: UploadState = {
    isFetching: false,
    isFalse: false,
    isSuccess: false,
}

export default (state = initialState, { type, payload }: any): UploadState => {
    switch (type) {
        case 'UPLOAD_FETCHING':
            return { isFetching: true, isFalse: false, isSuccess: false, }
        case 'UPLOAD_FAIL':
            return { isFetching: false, isFalse: true, isSuccess: false, }
        case 'UPLOAD_SUCCESS':
            return { isFetching: false, isFalse: false, isSuccess: true }

        default:
            return state
    }
}
