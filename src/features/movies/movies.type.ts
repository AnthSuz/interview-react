export interface Movie {
    id: string;
    title: string;
    category: string;
    likes: number;
    dislikes: number
}

export interface State {
    movies: Movie[];
    categories: string[];
    currentPage: number;
    numberPages: number;
    moviePerPage: 4 | 8 | 12;
}