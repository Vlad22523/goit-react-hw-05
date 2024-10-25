import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import { searchFilms } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchValue = searchParams.get("query") ?? "";
  const notify = (message) => toast.error(message);

  const handleSubmit = (values, actions) => {
    const searchQuery = values.moviename?.trim();
    if (!searchQuery) {
      setSearchParams({});
      return notify("Please enter a search query");
    }

    searchParams.set("query", searchQuery);
    setSearchParams(searchParams);
    actions.resetForm();
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const getData = async () => {
      try {
        setLoading(true);
        const data = await searchFilms(searchValue);
        if (data.length === 0) {
          setMovies([]);
          return notify("Didn't found your query");
        }
        setMovies(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchValue]);

  return (
    <div className={s.container}>
      <Toaster />
      <Formik initialValues={{ moviename: "" }} onSubmit={handleSubmit}>
        <Form className={s.searchForm}>
          <Field type="search" name="moviename" className={s.searchInput} />
          <button type="submit" className={s.searchButton}>
            Search
          </button>
        </Form>
      </Formik>
      {loading && <Loader />}
      <MoviesList movies={movies} basePath={""} className={s.moviesList} />
    </div>
  );
};

export default MoviesPage;
