import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { movies$ } from "../../movies";
import { categoriesData, fetchData, getCategories, moviesData, state, removeMovie, updateMoviePerPage, upPage, downPage } from "./moviesTest"

export function useMovies() {
    const movies = useAppSelector(moviesData);
    const globalState = useAppSelector(state)
    const categories = useAppSelector(categoriesData)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showFilter, setShowFilter] = useState<boolean>(false);
    console.log('globalState', globalState)

    useEffect(() => {
        console.log('AAAAA')
        movies$.then(result => dispatch(fetchData(result))).finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (!movies) return;
        const categoriesArray: string[] = [];
        movies.forEach((movie) => {
            console.log('movie', movie)
            categoriesArray.push(movie.category)
        })
        dispatch(getCategories([...new Set(categoriesArray) as any]))
        console.log('categoriesArray', [...new Set(categoriesArray) as any])
         
    }, [movies])

    const onToggleFilter = useCallback(() => {
        setShowFilter(!showFilter)
    }, [showFilter])

   
    const getFilterContent = useMemo(() => {
        if(!showFilter) return;
        return  (
        <div className="filter-content">
            {categories.map((categorie) => {
            return (
            <div>
                <input type="checkbox" id={categorie} name={categorie} />
                <label htmlFor="scales">{categorie}</label>
            </div>
            )
            })}  
        </div>)
    }, [showFilter])

    const start = useMemo(() => {
        return globalState.currentPage === 1 ? 0 : (globalState.currentPage - 1) * globalState.moviePerPage
    }, [globalState.currentPage, globalState.moviePerPage])

    const end = useMemo(() => {
        return globalState.moviePerPage * globalState.currentPage
    }, [globalState.moviePerPage, globalState.currentPage])

    const handleChangeMoviePerPages = useCallback((numberPerPages: 4 | 8 | 12) => {
        dispatch(updateMoviePerPage(numberPerPages))
    }, [])

    const handleUpPage = useCallback(() => {
        if (globalState.currentPage === globalState.numberPages) return;
        dispatch(upPage());
        // console.log('globalState', globalState)
    }, [globalState.currentPage, globalState.numberPages])

    const handleDownPage = useCallback(() => {
        if (globalState.currentPage === 1) return;
        dispatch(downPage());
    }, [globalState.currentPage])


    return { 
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
    }
}