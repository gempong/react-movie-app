import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";

import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../stores/movie/movieSlice";

import { Empty, Row, Col, Skeleton, Pagination } from "antd";

import "swiper/css";
import "swiper/css/navigation";

import HeroInternal from "../components/HeroInternal";
import MovieCard from "../components/MovieCard";

function Loading(i) {
    return (
        <Col lg={{ span: 6 }} xs={{ span: 24 }} className="skeleton-movie" key={i}>
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
        LoadingMovie.push(Loading(i));
    }

    const paginationHandler = (current) => {
        dispatch(searchMovie({ search: search, page: current, }));
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
            <HeroInternal pageTitle={`All Movies "${search}"`} />
            <div className="container 2xl:px-14mx-auto xl:px-0 px-4 xl:py-32 py-10">
                <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">
                    Search Result "{search}"
                </h2>
                {!loading && !!data && !data.length > 0 && (
                    <Empty />
                )}
                <Row gutter={50}>
                    {loading && LoadingMovie}
                    {!loading && data.length > 0 &&
                        data.map((i) => (
                            <Col className="xl:mb-14 mb-5" lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }} key={i._id}>
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
                {!loading && pagination.totalPages !== 1 && <Pagination onChange={paginationHandler} defaultCurrent={pagination.page} defaultPageSize={pagination.limit} total={pagination.totalPages} showSizeChanger={false} />}
            </div>
        </motion.div>
    );
}

export default SearchMovies;
