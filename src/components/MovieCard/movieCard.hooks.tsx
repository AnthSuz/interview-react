import { useCallback, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Movie } from "../../features/movies/movies.type";
import { removeMovie, state, updateIsLiked } from "../../features/movies/moviesTest";

export function useMovieCard(movie: Movie) {
    const globalState = useAppSelector(state)
    const dispatch = useAppDispatch();

    const getRatioBar = useCallback((like: number, dislike: number) => {
        //Get width like bar
        const likeWidth = Math.round(like * 100 / (like + dislike))
        //Get width disklike bar
        const dislikeWidth = 100 - likeWidth;
        return (
        <div className="ratio"> 
            <div className="ratio-like-dislike">
                <span></span><div className="like-bar" style={{width: `${likeWidth}%`}}><span className="tooltiptext">{likeWidth}%</span></div>
                <div className="dislike-bar"  style={{width: `${dislikeWidth}%`}}><span className="tooltiptext">{dislikeWidth}%</span></div>  
            </div>
            <p>{like} {like > 1 ? 'likes' : 'like'}, {dislike} {dislike > 1 ? 'dislikes' : 'dislike'}</p>
        </div>
        )
    }, [])

    const voteContent = useMemo(() => {
        return (
            <div className="vote">
                <span className={`material-symbols-outlined thump-up ${globalState.likedMovies.includes(movie.id) ? 'select' : ''}`} onClick={() => handleIsLikedMovie(movie.id, 'like')}>
                    thumb_up
                </span>  
                
                <span className={`material-symbols-outlined thump-down ${globalState.dislikedMovies.includes(movie.id) ? 'select' : ''}`} onClick={() => handleIsLikedMovie(movie.id, 'dislike')}>
                    thumb_down
                </span>
            </div>
        )
    }, [globalState.likedMovies, globalState.dislikedMovies, movie.title])

    const handleDeleteMovie = useCallback((id: string) => {
        dispatch(removeMovie(id))
    }, [])

    const handleIsLikedMovie = useCallback((movieId: string, value: 'like' | 'dislike') => {
        dispatch(updateIsLiked({movieId, value}))
    }, [])

    return {
        getRatioBar,
        handleDeleteMovie,
        handleIsLikedMovie,
        globalState,
        voteContent
    }
}