import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { reviewsFilm } from "../../services/api";

const MovieReviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      const getData = async () => {
        const data = await reviewsFilm(params.movieId);
        setReviews(data);
      };
      getData();
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }, [params.movieId]);

  if (reviews.length === 0) {
    return <p>We don&apos;t have any reviews</p>;
  }
  console.log(reviews);
  return (
    <div>
      {loading && <Loader />}
      <ul>
        {reviews.map((rew) => (
          <li key={rew.id}>
            <h2>Author: {rew.author}</h2>
            <p>{rew.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
