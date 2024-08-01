import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { castsFilm } from "../../services/api";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const params = useParams();
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await castsFilm(params.movieId);
        setCasts(data);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, [params.movieId]);

  if (casts.length === 0) {
    return <Loader />;
  }
  return (
    <div>
      <ul>
        {casts.map((act) => (
          <li key={act.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${act.profile_path}`}
              alt=""
            />
            <h3>{act.name}</h3>
            <p>Character: {act.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
