import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { moviesData, removeMovie } from "../../features/movies/moviesTest";

export function useMovieCard() {
    const movies = useAppSelector(moviesData);
    const dispatch = useAppDispatch();
    const getRatioBar = useCallback((like: number, dislike: number) => {
        const likeWidth = Math.round(like * 100 / (like + dislike))
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

    const handleDeleteMovie = useCallback((id: string) => {
        dispatch(removeMovie(id))
    }, [])

    return {
        getRatioBar,
        handleDeleteMovie
    }
}