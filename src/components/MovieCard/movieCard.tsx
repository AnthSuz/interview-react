
import { Movie } from '../../features/movies/movies.type';
import './movie-card.scss'
import { useMovieCard } from "./movieCard.hooks"
interface Props {
    movie: Movie;
    index: number;
}

export const MovieCard = ({movie, index}: Props) => {

    const { getRatioBar, handleDeleteMovie } = useMovieCard();

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

            <div className="vote">
                <span className="material-symbols-outlined thump-up" onClick={() => console.log('ici')}>
                    thumb_up
                </span>  
                
                <span className="material-symbols-outlined thump-down">
                    thumb_down
                </span>
            </div>
        </div>

    </div>
    )
}