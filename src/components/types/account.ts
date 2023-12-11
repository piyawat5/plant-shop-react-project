import { AnyAction, Dispatch } from "redux"

export const registerIsFetching = () => ({
    type: 'type',
})
export const registerIsFail = () => ({
    type: 'type',
})
export const registerIsSuccess = (payload: any) => ({
    type: 'type',
    payload
})

export const registerAction = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(registerIsFetching())

        } catch (error) {

        }
    }
}