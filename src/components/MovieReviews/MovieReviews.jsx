import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { reviewsFilm } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await reviewsFilm(params.movieId);
        setReviews(data);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [params.movieId]);

  if (reviews.length === 0) {
    return <p>We don&apos;t have any reviews</p>;
  }
  console.log(reviews);
  return (
    <div>
      {loading && <Loader />}
      <ul className={s.reviewList}>
        {reviews.map((rew) => (
          <li key={rew.id} className={s.reviewItem}>
            <h2 className={s.reviewAuthor}>Author: {rew.author}</h2>
            <p className={s.reviewContent}>{rew.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
