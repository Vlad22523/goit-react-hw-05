import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { detailsFilms } from "../../services/api";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  console.log(location);
  const goBackRef = useRef(location?.state || "/movies");
  useEffect(() => {
    // if (!params.movieId) {
    //   return;
    // }
    const getData = async () => {
      try {
        setLoader(true);
        const data = await detailsFilms(params.movieId);
        setMovieData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [params.movieId]);

  if (!movieData) {
    return <Loader />;
  }

  console.log(movieData);
  return (
    <>
      {loader && <Loader />}
      <Link to={goBackRef.current} className={s.goback}>
        Go back!
      </Link>
      <div className={s.container}>
        <div className={s.container_content}>
          <img
            className={s.image}
            src={`https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`}
            alt={movieData.title}
          />
          <div className={s.info}>
            <h2 className={s.title}>
              {movieData.title}
              {` (${movieData.release_date.slice(0, 4)})`}
            </h2>
            <p className={s.userScore}>
              User Score: {(movieData.vote_average * 10).toFixed(0)}%
            </p>
            <h2>Overview</h2>
            <p className={s.overview}>{movieData.overview}</p>
            <h2>Genres</h2>
            <ul className={s.genresList}>
              {movieData.genres.map(({ id, name }) => (
                <li className={s.genres} key={id}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className={s.navLinks}>
          <li>
            <NavLink className={s.navLink} to="cast">
              Casts
            </NavLink>
          </li>
          <li>
            <NavLink className={s.navLink} to="reviews">
              Rewievs
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetailsPage;
