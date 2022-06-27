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
    likedMovies: [],
    dislikedMovies: [],
}

function likeMovie(state: State, movie: string, index: number) {
    state.likedMovies.push(movie);
    state.movies[index].likes++;
}

function dislikeMovie(state: State, movie: string, index: number) {
    state.dislikedMovies.push(movie)
    state.movies[index].dislikes++;
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

            //Update currentPages
            if (currentState.currentPage !== 1 && currentState.movies.length <= currentState.moviePerPage) {
                state.currentPage -= 1;
            }

            //Update currentPages if remove all movies
            if(currentState.movies.length === 0) state.currentPage = 0;

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
            //Check if filter already exist, if false push filter to array
            if (currentState.filters.indexOf(action.payload) === -1) {
                state.filters.push(action.payload);
            } else {
                //if true remove filter from array
                currentState.filters.splice(currentState.filters.indexOf(action.payload), 1);
                state.filters = currentState.filters;
            }
        },
        updateIsLiked: (state, action: PayloadAction<{movieId: string, value: 'like' | 'dislike'}>) => {
            const index = state.movies.findIndex(movie => movie.id === action.payload.movieId);
            const movie = action.payload.movieId;
            const value = action.payload.value;
            const indexInLikedMovies = state.likedMovies.indexOf(movie);
            const indexInDislikedMovies = state.dislikedMovies.indexOf(movie);

            //if movie is not already like
            if (indexInLikedMovies !== -1) {
                //if already like return
                if(value === 'like') return;
                //else dislike movie and removie movie from like array
                dislikeMovie(state, movie, index);
                state.likedMovies.splice(indexInLikedMovies, 1);
                state.movies[index].likes--;
            //else if movie it not already dislike
            } else if (indexInDislikedMovies !== -1) {
                //if already dislike return
                if(value === 'dislike') return;
                //else like movie and removie movie from dislike array
                likeMovie(state, movie, index);
                state.dislikedMovies.splice(indexInDislikedMovies, 1);
                state.movies[index].dislikes--;
            //so we give it its first value 
            } else {
                if(value === 'like') {
                    likeMovie(state, movie, index)
                } else if (value === 'dislike') {
                    dislikeMovie(state, movie, index)
                }
            }
        }
    }
})

export const { fetchData, getCategories, removeMovie, updateMoviePerPage, upPage, downPage, updateFilter, updateIsLiked } = stateSlice.actions;
export const state = (state: RootState) => state.data
export const moviesData = (state: RootState) => state.data.movies;
export const categoriesData = (state: RootState) => state.data.categories;

export default stateSlice;