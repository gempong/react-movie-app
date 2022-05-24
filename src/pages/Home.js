import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";

import { Skeleton, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchPopularMovies,
  fetchAllGenres,
} from "../stores/movie/movieSlice";

import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";

function Loading() {
  return (
    <SwiperSlide className="skeleton-movie">
      <Skeleton.Avatar active size="large" shape="square" />
      <Skeleton active style={{ marginBottom: "50px" }}></Skeleton>
    </SwiperSlide>
  );
}

function Home() {
  const { data, loading } = useSelector((state) => state.movie.movies);
  const loadingPopular = useSelector((state) => state.movie.popular.loading);
  const dataPopular = useSelector((state) => state.movie.popular.data);
  const dataGenres = useSelector((state) => state.movie.allgenre.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchPopularMovies());
    dispatch(fetchAllGenres());
  }, [dispatch]);

  const LoadingMovie = [];
  for (let i = 1; i <= 4; i++) {
    LoadingMovie.push(Loading());
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      transition={{ delay: 0.7 }}
      variants={pageVariants}
    >
      <Hero />
      <div className="container mx-auto pt-32">
        <div className="flex items-center justify-between mb-14">
          <h2 className="text-4xl font-semibold leading-tight">
            Popular Movie
          </h2>
          <Link className="text-lg flex items-center" to="/movies">
            See All Movie <ArrowRightOutlined className="ml-3" />
          </Link>
        </div>
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          spaceBetween={50}
          slidesPerView={4}
          modules={[Autoplay]}
        >
          {loadingPopular && LoadingMovie}
          {dataPopular &&
            dataPopular.length > 0 &&
            dataPopular.map((i, index) => (
              <SwiperSlide>
                <MovieCard
                  id={i._id}
                  poster={i.poster}
                  title={i.title}
                  year={i.year}
                  rating={i.rating}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="container mx-auto py-32">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-4xl font-semibold leading-tight mb-8">
            Browse by Category
          </h2>
          <Link className="text-lg flex items-center" to="/movies">
            See All Movie <ArrowRightOutlined className="ml-3" />
          </Link>
        </div>
        <div className="mb-14">
          <Swiper spaceBetween={10} slidesPerView={10}>
            {dataGenres &&
              dataGenres.length > 0 &&
              dataGenres.map((i, index) => (
                <SwiperSlide>
                  <Link to={`/genre/${i}`}>
                    <Button
                      key={index}
                      className="w-full capitalize"
                      type="primary"
                      size="large"
                      ghost
                    >
                      {i}
                    </Button>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          spaceBetween={50}
          slidesPerView={4}
          modules={[Autoplay]}
        >
          {loading && LoadingMovie}
          {data.length > 0 &&
            data.map((i, index) => (
              <SwiperSlide>
                <MovieCard
                  id={i._id}
                  poster={i.poster}
                  title={i.title}
                  year={i.year}
                  rating={i.rating}
                  genres={i.genres}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </motion.div>
  );
}

export default Home;
