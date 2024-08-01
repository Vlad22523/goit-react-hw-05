import { Link, useLocation } from "react-router-dom";

const MoviesList = ({ movies, basePath }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map((film) => (
        <li key={film.id}>
          <Link to={`${basePath}${film.id.toString()}`} state={location}>
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
