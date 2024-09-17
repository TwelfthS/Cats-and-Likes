import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cat } from "../types"

const cats: Cat[] = []
const favs: Cat[] = []

const initialState = {
    cats,
    favs
}

const slice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        updateCats: (state, action: PayloadAction<Cat[]>) => {
            state.cats = state.cats.concat(action.payload)
        },
        updateFavs: (state, action: PayloadAction<Cat>) => {
            state.favs.push(action.payload)
        },
        removeFavs: (state, action: PayloadAction<number>) => {
            state.favs.splice(action.payload, 1)
        }
    },
})

export const {updateCats, updateFavs, removeFavs} = slice.actions

export default slice.reducer
