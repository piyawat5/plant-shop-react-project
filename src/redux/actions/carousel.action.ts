import { AnyAction, Dispatch } from "redux"

export const carouselIsSuccess = (payload: any) => ({
    type: 'CAROUSEL_SUCCESS',
    payload
})

export const positionX = (position: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(carouselIsSuccess(position))
    }
}

