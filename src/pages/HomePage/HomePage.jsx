import { useEffect, useState } from "react";
import { popularFilms } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        const data = await popularFilms();
        setMovies(data);
      };
      getData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <h1>Popular Movies</h1>
      <MoviesList movies={movies} basePath={"movies/"} />
    </>
  );
};

export default HomePage;
