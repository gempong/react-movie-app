import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchAllGenres } from "../stores/movie/movieSlice";

import { Row, Col, Skeleton, Button, Pagination } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import HeroInternal from "../components/HeroInternal";
import MovieCard from "../components/MovieCard";

function Loading() {
  return (
    <Col span={6} className="skeleton-movie">
      <Skeleton.Avatar active size="large" shape="square" />
      <Skeleton active style={{ marginBottom: "50px" }}></Skeleton>
    </Col>
  );
}

function DetailMovie() {
  const { genre } = useParams();
  const { data, pagination, loading, error } = useSelector(
    (state) => state.movie.moviesbygenre
  );
  const dataGenres = useSelector((state) => state.movie.allgenre.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllGenres());
    dispatch(fetchGenres({ genre: genre, page: 1, }));
  }, [dispatch, genre]);

  console.log(data);

  if (error) {
    console.log(error);
  }

  const LoadingMovie = [];
  for (let i = 1; i <= 4; i++) {
    LoadingMovie.push(Loading());
  }

  const paginationHandler = (current) => {
    dispatch(fetchGenres({ genre: genre, page: current, }));
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      transition={{ delay: 0.7 }}
      variants={pageVariants}
    >
      <HeroInternal pageTitle={`Genre: ${genre}`} />
      <div className="container mx-auto py-32">
        <h2 className="text-4xl font-semibold leading-tight mb-8">
          Browse by Category
        </h2>
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
                      ghost={i.genre !== genre}
                    >
                      {i}
                    </Button>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <Row gutter={50}>
          {loading && LoadingMovie}
          {!loading && data.length > 0 &&
            data.map((i, index) => (
              <Col className="mb-14" span={6} key={index}>
                <MovieCard
                  id={i._id}
                  poster={i.poster}
                  title={i.title}
                  year={i.year}
                  rating={i.rating}
                  genres={i.genres}
                /> 
              </Col>
            ))}
        </Row>
        {!loading && <Pagination onChange={paginationHandler} defaultCurrent={pagination.page} total={pagination.totalDocs} />}
      </div>
    </motion.div>
  );
}

export default DetailMovie;
