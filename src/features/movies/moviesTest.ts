import { RootState } from './../../app/store';
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { Movie, State } from './movies.type';

const initialState: State = {
    movies: [],
    categories: [],
    currentPage: 1,
    numberPages: 1,
    moviePerPage: 12,
    filters: [],
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
        removeMovie: (state, action: PayloadAction<string>) => {
            const currentState = {...state}
            //Delete movies by id
            currentState.movies.splice(currentState.movies.findIndex(mov => mov.id === action.payload), 1);
            state.movies = currentState.movies;

            //Updates filters based on remaining categories
            const currentCat: string[] = [];
            currentState.movies.forEach((movie) => currentCat.push(movie.category));
            const currentCatSort = [...new Set(currentCat) as any];
            state.filters = currentState.filters.filter(filter => currentCatSort.includes(filter)) ;

            //Update numberPages
            state.numberPages = Math.ceil(currentState.movies.length / currentState.moviePerPage);
        },
        updateMoviePerPage: (state, action: PayloadAction<4 | 8 | 12>) => {
            const currentState = {...state}
            state.moviePerPage = action.payload;
            state.numberPages = Math.ceil(currentState.movies.length / action.payload);
            //Reset current page at 1 if update movie per page
            state.currentPage = 1;
        },
        upPage: (state) => {
            state.currentPage += 1;
        },
        downPage: (state) => {
            state.currentPage -= 1;
        },
        updateFilter: (state, action: PayloadAction<string>) => {
            const currentState = {...state};
            if (currentState.filters.indexOf(action.payload) === -1) {
                state.filters.push(action.payload);
            } else {
                currentState.filters.splice(currentState.filters.indexOf(action.payload), 1);
                state.filters = currentState.filters;
            }
        }
    }
})

export const { fetchData, getCategories, removeMovie, updateMoviePerPage, upPage, downPage, updateFilter } = stateSlice.actions;
export const state = (state: RootState) => state.data
export const moviesData = (state: RootState) => state.data.movies;
export const categoriesData = (state: RootState) => state.data.categories;

export default stateSlice;