import Head from "next/head";
// import getConfig from "next/config";
import { useEffect, useState } from "react";
import Movie from "../src/components/Movie";

// const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
export default function Home(initialData) {
  const [searchResults, setSearchResults] = useState([]);
  const [formInput, setFormInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchResults(initialData.trendingMovies.results);
  }, [initialData]);

  const handleInputs = (event) => {
    let { name, value } = event.target;
    // setFormInputs({...formInputs, [name]: value});
    setSearchTerm(event.target.value);
  };

  const search = async (event) => {
    event.preventDefault();
    let movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=373c68c6c8a3b6850ced92a5e20d6541&query=${searchTerm}`
    );
    movies = await movies.json();
    setSearchResults(movies.results);
  };

  return (
    <div className="container">
      <Head>
        <title>Movie App</title>
      </Head>
      <div className="m-auto">
        <form className="search-form" onSubmit={search}>
          <input
            className="search"
            name="searchTerm"
            value={searchTerm}
            onChange={handleInputs}
            type="text"
            required
          />
          <button className="btn-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="black"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="movie-search-results-grid">
        {searchResults.map((each, index) => {
          return (
            <Movie
              key={each.id}
              index={each.id}
              title={each.title}
              poster_path={each.poster_path}
              overview={each.overview}
            />
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let trendingMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=373c68c6c8a3b6850ced92a5e20d6541`
  );
  trendingMovies = await trendingMovies.json();
  console.log(trendingMovies);
  return {
    props: { trendingMovies: trendingMovies }, // will be passed to the page component as props
  };
}
