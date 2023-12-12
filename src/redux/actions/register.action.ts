import { AnyAction, Dispatch } from "redux"

export const registerIsFetching = () => ({
    type: 'type',
})
export const registerIsFail = () => ({
    type: 'type2',
})
export const registerIsSuccess = (payload: any) => ({
    type: 'type3',
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