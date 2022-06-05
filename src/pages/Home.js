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

function Loading(i) {
    return (
        <SwiperSlide className="skeleton-movie" key={i}>
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
        LoadingMovie.push(Loading(i));
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
            <div className="container mx-auto xl:px-0 px-4 xl:pt-32 pt-10">
                <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
                    <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
                        Popular Movie
                    </h2>
                    <Link className="xl:text-lg text-base flex items-center" to="/movies">
                        See All Movie <ArrowRightOutlined className="ml-3" />
                    </Link>
                </div>
                <Swiper
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay]}
                >
                    {loadingPopular && LoadingMovie}
                    {dataPopular &&
                        dataPopular.length > 0 &&
                        dataPopular.map((i, index) => (
                            <SwiperSlide key={i._id}>
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
            <div className="container mx-auto xl:px-0 px-4 xl:py-32 py-10">
                <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-5">
                    <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
                        Browse by Category
                    </h2>
                    <Link className="xl:text-lg text-base flex items-center" to="/movies">
                        See All Movie <ArrowRightOutlined className="ml-3" />
                    </Link>
                </div>
                <div className="xl:mb-14 mb-10">
                    <Swiper
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
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
                                <SwiperSlide key={index}>
                                    <Link to={`/genre/${i}`}>
                                        <Button
                                            className="w-full capitalize rounded-full"
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
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay]}
                >
                    {loading && LoadingMovie}
                    {data.length > 0 &&
                        data.map((i) => (
                            <SwiperSlide key={i._id}>
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
