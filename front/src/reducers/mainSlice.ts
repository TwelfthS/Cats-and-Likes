import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cat } from "../types"

const cats: Cat[] = []
const favs: Cat[] = []

const initialState = {
    cats,
    favs,
    isFirstLoad: true
}

const slice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        loadFavs: (state, action: PayloadAction<Cat[]>) => {
            state.favs = [...action.payload]
            state.isFirstLoad = false
        },
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

export const {loadFavs, updateCats, updateFavs, removeFavs} = slice.actions

export default slice.reducer
