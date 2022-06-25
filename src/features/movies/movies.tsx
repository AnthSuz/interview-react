import { MovieCard } from "../../components/MovieCard/movieCard"
import { useMovies } from "./movies.hooks"
import './movies.scss'

export const Movies = () => {
    const { 
        movies, 
        isLoading, 
        categories, 
        onToggleFilter, 
        getFilterContent, 
        handleChangeMoviePerPages, 
        globalState, 
        handleUpPage, 
        handleDownPage,
        start,
        end 
    } = useMovies()
    console.log('categories', categories)
    return isLoading ? <p>Wait...</p> : 
    (
        <div className="movie-page"> 
            <div className="title-filter">
                <h1>
                    <i>Films</i>
                </h1>
                <button onClick={onToggleFilter}>
                    <p>Filtrer par catégorie(s)</p>
                    <span className="material-symbols-outlined thump-up">
                        tune
                    </span>  
                </button>
            </div>
            
            {getFilterContent}

            <div className="movies-list">
                {movies.slice(start, end).map((movie, index) => {
                    return <MovieCard movie={movie} index={index} />
                })}
            </div>

            <div className="pagination">
            <select name="pagination" id="pagination" onChange={(e) => handleChangeMoviePerPages(parseInt(e.target.value) as 4 | 8 | 12)}>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12} selected>12</option>
                </select>  
                <div className="page-selector">
                    <span className={`material-symbols-outlined left-arrow ${globalState.currentPage === 1 ? 'disabled': ''}`} onClick={handleDownPage}>
                        chevron_left
                    </span>  
                    <p>{globalState.currentPage} / {globalState.numberPages}</p>
                    <span className={`material-symbols-outlined right-arrow ${globalState.currentPage < globalState.numberPages ? '' : 'disabled'}`} onClick={handleUpPage}>
                        chevron_right
                    </span>  
                </div>
                          
            </div>
        </div>
    )
}