import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import { searchFilms } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

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
    try {
      const getData = async () => {
        setLoading(true);
        const data = await searchFilms(searchValue);
        if (data.length === 0) {
          setMovies([]);
          return notify("Didn't found your query");
        }
        setMovies(data);
      };
      getData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  return (
    <>
      <Toaster />
      <Formik initialValues={{ moviename: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field type="search" name="moviename" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {loading && <Loader />}
      <MoviesList movies={movies} basePath={""} />
    </>
  );
};

export default MoviesPage;
