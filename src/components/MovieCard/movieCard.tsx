
import { Movie } from '../../features/movies/movies.type';
import './movie-card.scss'
import { useMovieCard } from "./movieCard.hooks"
interface Props {
    movie: Movie;
}

export const MovieCard = ({movie}: Props) => {

    const { getRatioBar, handleDeleteMovie, handleIsLikedMovie, globalState, voteContent } = useMovieCard(movie);

    return (
    <div className="movie-card">
        <div> 
            <div className="title-and-delete-button">
            <h4>{movie.title}</h4> 
            <span className="material-symbols-outlined" onClick={() => handleDeleteMovie(movie.id)}>
                delete
            </span>
            </div>
            <p>{movie.category}</p>
        </div>

        <div className="ratio-vote">
            {getRatioBar(movie.likes, movie.dislikes)}
            {voteContent}
        </div>
    </div>
    )
}