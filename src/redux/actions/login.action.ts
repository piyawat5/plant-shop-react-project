import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"
import axios from "axios"

export const loginIsFetching = () => ({
    type: 'LOGIN_FETCHING',
})
export const loginIsFail = (payload?: any) => ({
    type: 'LOGIN_FAIL',
    payload
})
export const loginIsSuccess = (payload: any) => ({
    type: 'LOGIN_SUCCESS',
    payload
})
export const logoutIsSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
})

export const loginAction = (body: any, navigate: (path: string) => void) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(loginIsFetching())

            const authen = await axios.post(`${domain}/account/login`, body)

            if (authen.status === 200) {
                const authorization = await axios.get(`${domain}/account/authen`, {
                    headers: {
                        Authorization: `Bearer ${authen.data.token}`
                    }
                })
                if (authorization.status === 401) {
                    dispatch(loginIsFail())
                    return;
                }

                localStorage.setItem('TOKEN', authen.data.token)
                dispatch(loginIsSuccess({ msg: 'login successfully!!', authorization: authorization.data }))
                navigate('/home')
                return;
            }

        } catch (error: any) {
            if (error.response.status === 404) {
                dispatch(loginIsFail('404'))
                return;
            }
            dispatch(loginIsFail())

        }
    }
}

//to refresh browser
export const authen = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {

            const token = localStorage.getItem('TOKEN')
            const authorization = await axios.get(`${domain}/account/authen`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (authorization.status === 401) {
                dispatch(loginIsFail())
                return;
            }

            dispatch(loginIsSuccess({ msg: 'authen successfully!', authorization: authorization.data }))

        } catch (error) {
            dispatch(loginIsFail())
        }
    }
}

export const logoutAction = (navigate: (path: string) => void) => {
    return (dispatch: Dispatch<AnyAction>) => {
        try {
            alert('Logout is successfully!')
            localStorage.removeItem('TOKEN')

            dispatch(logoutIsSuccess())
            navigate('/login')

        } catch (error) {
            console.log(error)
        }
    }
}