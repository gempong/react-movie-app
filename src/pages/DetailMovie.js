import React, { useEffect, useState } from "react";
import moment from 'moment'
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";
import { Empty, Menu, Dropdown, Row, Col, Button, Skeleton, Avatar, message } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovies } from "../stores/movie/movieSlice";
import { deleteReviews } from "../stores/reviews/reviewSlice";
import { StarOutlined, PlayCircleOutlined } from "@ant-design/icons";
import FormReviews from "../components/ModalFormReview";

function Loading(i) {
    return (
        <SwiperSlide className="skeleton-cast" key={i}>
            <Skeleton.Avatar active size="large" shape="square" />
            <Skeleton active style={{ marginBottom: "50px" }}></Skeleton>
        </SwiperSlide>
    );
}

function DetailMovie() {
    const { id } = useParams();
    const { data, loading, error } = useSelector((state) => state.movie.movie);
    const { loadingDelete } = useSelector((state) => state.reviews.delete);
    const { token, success } = useSelector((state) => state.user.auth);
    const userId = useSelector((state) => state.user.user.data);
    const dispatch = useDispatch();
    const reviewsEvent = { click: () => { } };
    const [review, setReview] = useState({ edit: false, value: null })

    const createReview = () => {
        setReview({ edit: false, value: null })
        reviewsEvent.click()
    }

    const editReview = (value) => {
        reviewsEvent.click()
        setReview({ edit: true, value: value })
    }

    const deleteReview = async (MovieId) => {
        const value = { MovieId, token }
        await dispatch(deleteReviews(value))
        await dispatch(fetchDetailMovies(id))
        message.success('Delete Your Review Successfully')
    }

    useEffect(() => {
        dispatch(fetchDetailMovies(id));
    }, [dispatch, id]);

    if (error) {
        console.log(error)
    }

    const rating = (x) => Number.parseFloat(x).toFixed(1);
    const loadingCast = [];
    for (let i = 1; i <= 4; i++) {
        loadingCast.push(Loading(i));
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ delay: 0.7 }}
            variants={pageVariants}
        >
            <section style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${data ? data.poster : ''}')` }} className={`hero-content pt-24 bg-no-repeat bg-cover flex items-center`}>
                <div className="container mx-auto xl:px-0 px-4 py-24">
                    <Row>
                        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                            <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5">
                                {data ? data.title : ''}
                            </h1>
                            <div className="genre mb-7">
                                {!loading && !!data && !!data.genres &&
                                    data.genres.length > 0 &&
                                    data.genres.map((item, index) => (
                                        <span className="text-white xl:text-lg sm:text-base text-sm inline-block" key={index}>
                                            {item}
                                            {data.genres.length !== index + 1 && <span key={item.id} className="mr-2">,</span>}
                                        </span>
                                    ))}
                            </div>
                            <p className="text-white xl:text-lg sm:text-base text-sm leading-loose mb-7">
                                {data ? data.synopsis : ''}
                            </p>
                            <p className="font-normal xl:text-lg sm:text-base text-sm text-white mb-7 flex items-center">
                                <StarOutlined className="mr-2 xl:text-lg sm:text-base text-sm text-yellow-500 leading-none" />{" "}
                                <span className="leading-none">{rating(data ? data.rating : '')} / 10</span>
                            </p>
                            <Button
                                className="flex items-center uppercase font-semibold leading-1 px-5 rounded-full"
                                type="primary"
                                icon={<PlayCircleOutlined />}
                                size="large"
                                onClick={() => window.open(data.trailer, "_blank")}
                            >
                                Watch trailer
                            </Button>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className="xl:pt-28 pt-10">
                <div className="container mx-auto xl:px-0 px-4">
                    <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-8 mb-5">
                        Cast and Crew Info
                    </h2>
                    {!loading && !!data && !!data.casts && !data.casts.length > 0 && (
                        <Empty />
                    )}
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
                        {loading && loadingCast}
                        {!loading && !!data & !!data.casts && data.casts.length > 0 && data.casts.map((i) => (
                            <SwiperSlide key={i.id}>
                                <div className="cast-profile">
                                    <img className="w-full mb-3 rounded-xl" alt={i.name} src={i.profile_path ? `https://image.tmdb.org/t/p/w500${i.profile_path}` : 'https://picsum.photos/id/11/283/424'} />
                                    <h4 className="font-bold text-lg mb-1">
                                        {i.name}
                                    </h4>
                                    <p className="text-gray-500">{i.character}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className="xl:py-28 py-10">
                <div className="container mx-auto xl:px-0 px-4">
                    <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-8 mb-5">
                        <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-0 mb-5">
                            What People Says
                        </h2>
                        {success && (
                            <Button
                                ghost
                                className="min-w-[100px] rounded-full"
                                type="primary"
                                size="large"
                                onClick={createReview}
                            >
                                Leave a comment
                            </Button>
                        )}
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
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Autoplay]}
                    >
                        {loading && loadingCast}
                        {!loading && !!data && !!data.reviews && data.reviews.length > 0 && data.reviews.map((i, index) => (
                            <SwiperSlide key={i._id} className="pb-1">
                                <div key={i._id} className="review-card p-7 border border-solid border-gray-200 rounded-xl">
                                    {userId && i.reviewer !== null && userId._id === i.reviewer._id && (
                                        <Dropdown overlay={
                                            <Menu className="mt-3">
                                                <Menu.Item key="Edit" onClick={() => editReview(i)}>Edit</Menu.Item>
                                                <Menu.Item key="Delete" loading={loadingDelete} onClick={() => deleteReview(i._id)}>Delete</Menu.Item>
                                            </Menu>
                                        } placement="bottomLeft">
                                            <EllipsisOutlined className="absolute right-7 top-6 text-lg" />
                                        </Dropdown>
                                    )}
                                    {i.reviewer !== null && (
                                        <div className="flex items-center mb-5">
                                            <Avatar src={i.reviewer ? i.reviewer.image : `https://ui-avatars.com/api/?name=${i.reviewer.first_name + ' ' + i.reviewer.last_name}`} />
                                            <span className="ml-3 capitalize text-base">{i.reviewer.first_name + ' ' + i.reviewer.last_name}</span>
                                        </div>
                                    )}
                                    {i.reviewer == null && (
                                        <div className="flex items-center mb-5">
                                            <Avatar src={'https://ui-avatars.com/api/?name=Not+Found'} />
                                            <span className="ml-3 capitalize text-base">User Not Found</span>
                                        </div>
                                    )}
                                    <h4 className="font-bold text-lg mb-3 capitalize">
                                        {i.title}
                                    </h4>
                                    <p className="font-normal mb-3 flex items-center">
                                        <StarOutlined className="mr-2 text-yellow-500 leading-none" />{" "}
                                        <span className="leading-none">{rating(i ? i.rating : '')} / 10</span>
                                    </p>
                                    <p className="text-base mb-3 text-gray-500">{i.content}</p>
                                    <p className="text-sm m-0 text-gray-500">{moment(i.createdAt).format('D MMM Y')}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {!loading && !!data && !!data.reviews && !data.reviews.length > 0 && (
                        <Empty />
                    )}
                </div>
            </section>
            <FormReviews movie={id} events={reviewsEvent} edit={review.edit} reviewsValue={review.value} />
        </motion.div>
    );
}

export default DetailMovie;
