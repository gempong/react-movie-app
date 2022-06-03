import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";

import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../stores/movie/movieSlice";

import { Row, Col, Skeleton, Pagination } from "antd";

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

function SearchMovies() {
    const { search } = useParams();
    const { data, loading, pagination } = useSelector(
        (state) => state.movie.searchmovie
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchMovie({ search: search, page: 1, }));
    }, [search, dispatch]);

    const LoadingMovie = [];
    for (let i = 1; i <= 4; i++) {
        LoadingMovie.push(Loading());
    }

    const paginationHandler = (current) => {
        dispatch(searchMovie({ search: search, page: current, }));
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ delay: 0.7 }}
            variants={pageVariants}
        >
            <HeroInternal pageTitle={`All Movies "${search}"`} />
            <div className="container mx-auto py-32">
                <h2 className="text-4xl font-semibold leading-tight mb-14">
                    Search Result "{search}"
                </h2>
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

export default SearchMovies;
