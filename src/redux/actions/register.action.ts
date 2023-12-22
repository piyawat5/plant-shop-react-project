import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"
import axios from "axios"

export const registerIsFetching = () => ({
    type: 'REGISTER_FETCHING',
})
export const registerIsFail = () => ({
    type: 'REGISTER_FAIL',
})
export const registerIsSuccess = (payload: any) => ({
    type: 'REGISTER_SUCCESS',
    payload
})

export const registerAction = (body: any, navigate: (path: string) => void) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(registerIsFetching())

            const res = await axios.post(`${domain}/account/register`, body)

            if (res.status === 200) {
                dispatch(registerIsSuccess(res.data))
                alert(res.data.message)
                navigate('/login')
                return;
            }
            if (res.status === 409) {
                dispatch(registerIsFail())
                return;
            }

        } catch (error) {
            dispatch(registerIsFail())

        }
    }
}