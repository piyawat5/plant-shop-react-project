import { Dispatch } from "react"
import { AnyAction } from "redux"

export const clearSearch = () => ({
    type: 'CLEAR',
})

export const handleClearSearch = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch(clearSearch())
    }
}