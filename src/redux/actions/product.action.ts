import axios from "axios"
import { AnyAction, Dispatch } from "redux"
import { domain } from "../../utils/const"
import { productIdIsSuccess } from "./productId.action";

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
            const token = localStorage.getItem('TOKEN')
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
                return filterProductName ? true : false;
            }).filter((item: any) => {
                if (searchType) {
                    const filterProductType = item.category.name.toLowerCase() === searchType?.toLowerCase()
                    if (filterProductType) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            }).filter((item: any) => {
                if (searchStartPrice) {
                    const filterProductStartPrice = item.price >= searchStartPrice
                    if (filterProductStartPrice) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            }).filter((item: any) => {
                if (searchEndPrice) {
                    const filterProductEndPrice = item.price <= searchEndPrice
                    if (filterProductEndPrice) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }

            })

            dispatch(ProductIsSuccess(combindSearch ? filterData : data))

        } catch (error) {
            console.log(error)
            dispatch(ProductIsFail())
        }
    }
}

export const ProductPost = (body: any, navigate: (path: string) => void) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(ProductIsFetching())
            const token = localStorage.getItem('TOKEN')
            const res = await axios.post(`${domain}/product/create`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            dispatch(ProductIsSuccess([]))
            res.data && navigate('/admin-stock')


        } catch (error) {
            dispatch(ProductIsFail())
        }
    }
}


export const ProductEdit = (body: any, navigate: (path: string) => void) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(ProductIsFetching())
            const token = localStorage.getItem('TOKEN')
            const res = await axios.put(`${domain}/product/edit`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })

            dispatch(productIdIsSuccess([]))
            res.data && navigate('/admin-stock')

        } catch (error) {
            dispatch(ProductIsFail())
        }
    }
}

export const ProductDelete = (id: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            //is fetching
            dispatch(ProductIsFetching())
            const token = localStorage.getItem('TOKEN')
            await axios.delete(`${domain}/product/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(ProductIsSuccess([]))

        } catch (error) {
            dispatch(ProductIsFail())
        }
    }
}