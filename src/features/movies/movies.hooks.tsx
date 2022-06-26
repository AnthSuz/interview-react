import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { movies$ } from "../../movies";
import { categoriesData, fetchData, getCategories, moviesData, state, removeMovie, updateMoviePerPage, upPage, downPage, updateFilter } from "./moviesTest"

export function useMovies() {
    const movies = useAppSelector(moviesData);
    const globalState = useAppSelector(state)
    const categories = useAppSelector(categoriesData)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        movies$.then(result => dispatch(fetchData(result))).finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (!movies) return;
        const categoriesArray: string[] = [];
        //Get different categories
        movies.forEach((movie) => {
            categoriesArray.push(movie.category)
        })
        dispatch(getCategories([...new Set(categoriesArray) as any]))
    }, [movies])

    const onToggleFilter = useCallback(() => {
        setShowFilter(!showFilter)
    }, [showFilter])

    const handleSelectFilters = useCallback((value: string) => {
        dispatch(updateFilter(value))
    }, [])

   
    const getFilterContent = useMemo(() => {
        //Return filters choices if showFilter is true
        if(!showFilter) return;
        return  (
        <div className="filter-content">
            {categories.map((categorie) => {
            return (
            <div>
                <input type="checkbox" id={categorie} name={categorie} checked={globalState.filters.includes(categorie)} value={categorie} onChange={(e) => handleSelectFilters(e.target.value)} />
                <label htmlFor="scales">{categorie}</label>
            </div>
            )
            })}  
        </div>
        )
    }, [showFilter, categories, globalState.filters])

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