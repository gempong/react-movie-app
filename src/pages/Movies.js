import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";

import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../stores/movie/movieSlice";

import { Row, Col, Skeleton, Pagination } from "antd";

import "swiper/css";
import "swiper/css/navigation";

import HeroInternal from "../components/HeroInternal";
import MovieCard from "../components/MovieCard";

function Loading() {
    return (
        <Col lg={{ span: 6 }} xs={{ span: 24 }} className="skeleton-movie">
            <Skeleton.Avatar active size="large" shape="square" />
            <Skeleton active style={{ marginBottom: "50px" }}></Skeleton>
        </Col>
    );
}

function DetailMovie() {
    const { data, loading, pagination } = useSelector(
        (state) => state.movie.movies
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies(1));
    }, [dispatch]);

    const LoadingMovie = [];
    for (let i = 1; i <= 4; i++) {
        LoadingMovie.push(Loading());
    }

    const paginationHandler = (current) => {
        dispatch(fetchMovies(current));
        window.scrollTo(0, 0);
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ delay: 0.7 }}
            variants={pageVariants}
        >
            <HeroInternal pageTitle="All Movies" />
            <div className="container mx-auto xl:px-0 px-4 xl:py-32 py-10">
                <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">
                    All Movies
                </h2>
                <Row gutter={50}>
                    {loading && LoadingMovie}
                    {!loading && data.length > 0 &&
                        data.map((i, index) => (
                            <Col className="xl:mb-14 mb-5" lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }} key={index}>
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
                {!loading && pagination.totalPages !== 1 && <Pagination onChange={paginationHandler} defaultCurrent={pagination.page} defaultPageSize={pagination.limit} total={pagination.totalDocs} showSizeChanger={false} />}
            </div>
        </motion.div>
    );
}

export default DetailMovie;
