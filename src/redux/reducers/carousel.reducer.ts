/* eslint-disable import/no-anonymous-default-export */

export type CarouselState = {
    positionX: number,
}

const initialState: CarouselState = {
    positionX: 0,
}

export default (state = initialState, { type, payload }: any): CarouselState => {
    switch (type) {
        case 'CAROUSEL_SUCCESS':
            return { positionX: payload }

        default:
            return state
    }
}
