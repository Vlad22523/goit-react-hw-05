import { useEffect, useState } from "react";
import { popularFilms } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await popularFilms();
        setMovies(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>Popular Movies</h1>
      {loading && <Loader />}
      <MoviesList movies={movies} basePath={"movies/"} />
    </>
  );
};

export default HomePage;
