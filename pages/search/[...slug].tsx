import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import Layout from "../../components/layout/Layout";

function Search() {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug && slug[0]) {
      fetchMovies(slug[0]);
    }
  }, [slug]);

  const fetchMovies = async (query: string) => {
    const movieUrl = `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=cfe422613b250f702980a3bbf9e90716`;
    const tvUrl = `https://api.themoviedb.org/3/discover/tv?with_networks=213&query=${query}&api_key=cfe422613b250f702980a3bbf9e90716`;

    try {
      const [movieReq, tvReq] = await Promise.all([
        fetch(movieUrl),
        fetch(tvUrl),
      ]);

      const [movieRes, tvRes] = await Promise.all([movieReq.json(), tvReq.json()]);

      const movieResults = movieRes.results || [];
      const tvResults = tvRes.results || [];

      const combinedResults = [...movieResults, ...tvResults];

      setData(combinedResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Layout title={"Showing Results"}>
      <Container Data={data} place="" heading="Showing Results for" />
    </Layout>
  );
}

export default Search;
