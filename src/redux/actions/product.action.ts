import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain, token } from "../../utils/const"

type SearchProductPrice = {
    startPrice?: number;
    endPrice?: number;
}

type CombindSearch = {
    searchProductName?: string;
    searchProductType?: string;
    searchProductPrice?: SearchProductPrice
}

export const ProductIsFetching = () => ({
    type: 'PRODUCT_FETCHING',
})
export const ProductIsFail = () => ({
    type: 'PRODUCT_FAIL',
})
export const ProductIsSuccess = (payload: any) => ({
    type: 'PRODUCT_SUCCESS',
    payload
})

export const ProductAction = (combindSearch?: CombindSearch) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(ProductIsFetching())

            const res = await axios.get(`${domain}/product`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let data = res.data
            const searchName = combindSearch?.searchProductName;
            const searchType = combindSearch?.searchProductType
            const searchStartPrice = combindSearch?.searchProductPrice?.startPrice
            const searchEndPrice = combindSearch?.searchProductPrice?.endPrice

            const filterData = data.filter((item: any) => {
                const filterProductName = item.name.toLowerCase().includes(searchName?.toLowerCase())



                return filterProductName ? true : false
            })

            console.log('filterProduct!!!', filterData)
            dispatch(ProductIsSuccess(filterData))

        } catch (error) {
            dispatch(ProductIsFail())
        }
    }
}

// export const ProductPostAction = () => {
//     return async (dispatch: Dispatch<AnyAction>) => {
//         try {
//             //is fetching
//             dispatch(ProductIsFetching())

//              await axios.post(`${domain}/product`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             dispatch(ProductIsSuccess(res.data))
//             console.log(res.data)

//         } catch (error) {
//             dispatch(ProductIsFail())
//         }
//     }
// }