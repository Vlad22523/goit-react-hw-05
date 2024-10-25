import { Link, useLocation } from "react-router-dom";
import s from "./MoviesList.module.css";

const MoviesList = ({ movies, basePath }) => {
  const location = useLocation();
  return (
    <ul className={s.movieList}>
      {movies.map((film) => (
        <li key={film.id} className={s.movieItem}>
          <Link
            to={`${basePath}${film.id.toString()}`}
            state={location}
            className={s.movieLink}
          >
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
