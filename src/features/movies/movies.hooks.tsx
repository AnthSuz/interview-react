import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { movies$ } from "../../movies";
import { fetchData, getCategories, state, updateMoviePerPage, upPage, downPage, updateFilter } from "./moviesTest"

export function useMovies() {
    const globalState = useAppSelector(state)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        movies$.then(result => dispatch(fetchData(result))).finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (!globalState.movies) return;
        const categoriesArray: string[] = [];
        //Get different categories
        globalState.movies.forEach((movie) => {
            categoriesArray.push(movie.category)
        })
        dispatch(getCategories([...new Set(categoriesArray) as any]))
    }, [globalState.movies])

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
            {globalState.categories.map((categorie, index) => {
            return (
            <div key={index}>
                <input type="checkbox" id={categorie} name={categorie} checked={globalState.filters.includes(categorie)} value={categorie} onChange={(e) => handleSelectFilters(e.target.value)} />
                <label htmlFor="scales">{categorie}</label>
            </div>
            )
            })}  
        </div>
        )
    }, [showFilter, globalState.categories, globalState.filters])

    const start = useMemo(() => {
        //Get start for slice movies data
        return globalState.currentPage === 1 ? 0 : (globalState.currentPage - 1) * globalState.moviePerPage
    }, [globalState.currentPage, globalState.moviePerPage])

    const end = useMemo(() => {
        //Get end for slice movies data
        return globalState.moviePerPage * globalState.currentPage
    }, [globalState.moviePerPage, globalState.currentPage])

    const handleChangeMoviePerPages = useCallback((numberPerPages: 4 | 8 | 12) => {
        //Update number movie per page
        dispatch(updateMoviePerPage(numberPerPages))
    }, [])

    const handleUpPage = useCallback(() => {
        //Check if current page is last page
        if (globalState.currentPage === globalState.numberPages) return;
        //if false change page
        dispatch(upPage());
    }, [globalState.currentPage, globalState.numberPages])
    
    const handleDownPage = useCallback(() => {
        //Check if current page is first page
        if (globalState.currentPage === 1) return;
        //if false change page
        dispatch(downPage());
    }, [globalState.currentPage])

    const getContentNoData = useMemo(() => {
        if(globalState.movies.length > 0) return;
        return (
            <div className="no-data">
                <p>Vous avez supprimé tous les films.. Alors voici une photo de chat, tout le monde aime les chats. </p>
                <img src="https://i-mom.unimedias.fr/2022/03/14/chat.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=crop&h=591&w=1050" alt="no data picture"/>
            </div>
        )
    }, [globalState.movies.length])

    return { 
        isLoading, 
        onToggleFilter, 
        getFilterContent, 
        handleChangeMoviePerPages, 
        globalState, 
        handleUpPage, 
        handleDownPage,
        start, 
        end,
        getContentNoData,
    }
}