import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchAllGenres } from "../stores/movie/movieSlice";

import { Row, Col, Skeleton, Button, Pagination } from "antd";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

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

    if (error) {
        console.log(error);
    }

    const LoadingMovie = [];
    for (let i = 1; i <= 4; i++) {
        LoadingMovie.push(Loading());
    }

    const paginationHandler = (current) => {
        dispatch(fetchGenres({ genre: genre, page: current, }));
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
            <HeroInternal pageTitle={`Genre: ${genre}`} />
            <div className="container mx-auto xl:px-0 px-4 xl:py-32 py-10">
                <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">
                    Browse by Category
                </h2>
                <div className="xl:mb-14 mb-5">
                    <Swiper breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 8,
                            spaceBetween: 10,
                        },
                    }}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay]}
                    >
                        {dataGenres &&
                            dataGenres.length > 0 &&
                            dataGenres.map((i, index) => (
                                <SwiperSlide>
                                    <Link to={`/genre/${i}`}>
                                        <Button
                                            key={index}
                                            className="w-full capitalize rounded-full"
                                            type="primary"
                                            size="large"
                                            ghost={i !== genre}
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
