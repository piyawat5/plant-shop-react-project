import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"

export const uploadIsFetching = () => ({
    type: 'UPLOAD_FETCHING',
})
export const uploadIsFail = () => ({
    type: 'UPLOAD_FAIL',
})
export const uploadIsSuccess = () => ({
    type: 'UPLOAD_SUCCESS',
})


