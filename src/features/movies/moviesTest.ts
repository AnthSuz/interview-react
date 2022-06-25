import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, State } from './movies.type';

const initialState: State = {
    movies: [],
    categories: [],
    currentPage: 1,
    numberPages: 1,
    moviePerPage: 12,
}
export const stateSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchData: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
        getCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload;
        },
        removeMovie: (state, action: PayloadAction<number>) => {
            const currentState = {...state}
            currentState.movies.splice(action.payload, 1);
            state.movies = currentState.movies;
            state.numberPages = Math.ceil(currentState.movies.length / currentState.moviePerPage)
            
        },
        updateMoviePerPage: (state, action: PayloadAction<4 | 8 | 12>) => {
            const currentState = {...state}
            state.moviePerPage = action.payload;
            state.numberPages = Math.ceil(currentState.movies.length / action.payload);
        },
        upPage: (state) => {
            state.currentPage += 1
        },
        downPage: (state) => {
            state.currentPage -= 1
        }
    }
})

export const { fetchData, getCategories, removeMovie, updateMoviePerPage, upPage, downPage } = stateSlice.actions;
export const state = (state: RootState) => state.data
export const moviesData = (state: RootState) => state.data.movies;
export const categoriesData = (state: RootState) => state.data.categories;

export default stateSlice;