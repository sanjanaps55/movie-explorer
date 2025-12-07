import MovieCard from "../components/moviecard"
import "../css/Home.css"
import { useState,useEffect } from "react";
import { searchMovies,getPopularMovies } from "../services/api";

console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);
console.log("API_KEY:", import.meta.env.VITE_API_KEY);

function Home(){
    const [serachQuery,setSerachQuery]= useState("");
    const [movies,setMovies]=useState([]);
    const [error,setError]=useState(null);
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
        const loadPopularMovies = async() =>{
            try{
                const popularMovies= await getPopularMovies()
                setMovies(popularMovies)
            }catch(err){
                console.log(err);
                setError("Falied to load movies...")
            }finally{
                setLoading(false)
            }
        }
        loadPopularMovies()

    },[])
    const handlesearch= async(e)=>{
        e.preventDefault()
        if(!serachQuery.trim()) return
        if (loading) return 

        setLoading(true)
        try{
            const searchResults=await searchMovies(serachQuery)
            setMovies(searchResults)
            setError(null)
        }catch(err){
            console.log(err)
            setError("movies faile to laod...")
        }finally{
            setLoading(false)
        }

    };
    return <div className="home">
        <form onSubmit={handlesearch} className="serach-form">
            <input
             type="text"
              placeholder="serach for movie..." 
              className="serach-input"
              value={serachQuery}
              onChange={(e)=>setSerachQuery(e.target.value)}/>
            <button type="submit" className="search-button">Serach</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
            <div className="loading">Loading...</div>
        ):(
            <div className="movies-grid">
                {movies.map((movie)=> (
                    movie.title.toLowerCase().startsWith(serachQuery) && <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        )
    }
        
    </div>
}
export default Home