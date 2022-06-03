import React, { useEffect } from "react";
import moment from 'moment'
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";
import { Row, Col, Button, Skeleton, Avatar } from "antd";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovies } from "../stores/movie/movieSlice";
import { fetchReviews } from "../stores/reviews/reviewSlice";
import { StarOutlined, PlayCircleOutlined } from "@ant-design/icons";
import FormReviews from "../components/ModalFormReview";

function Loading() {
    return (
        <SwiperSlide className="skeleton-cast">
            <Skeleton.Avatar active size="large" shape="square" />
            <Skeleton active style={{ marginBottom: "50px" }}></Skeleton>
        </SwiperSlide>
    );
}

function DetailMovie() {
    const { id } = useParams();
    const { data, loading, error } = useSelector((state) => state.movie.movie);
    const reviews = useSelector((state) => state.reviews.reviews.data);
    const success = useSelector((state) => state.user.auth.success);
    const dispatch = useDispatch();

    const reviewsEvent = { click: () => { } };

    useEffect(() => {
        dispatch(fetchReviews())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchDetailMovies(id));
    }, [dispatch, id]);

    if (error) {
        console.log(error)
    }

    const rating = (x) => Number.parseFloat(x).toFixed(1);
    const loadingCast = [];
    for (let i = 1; i <= 4; i++) {
        loadingCast.push(Loading());
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ delay: 0.7 }}
            variants={pageVariants}
        >
            <section style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${data.poster}')` }} className={`hero-content pt-24 bg-no-repeat bg-cover flex items-center`}>
                <div className="container mx-auto py-24">
                    <Row>
                        <Col span={12}>
                            <h1 className="text-white text-6xl font-semibold leading-tight mb-5 capitalize">
                                {data ? data.title : ''}
                            </h1>
                            <div className="genre mb-7">
                                {!!data.genres &&
                                    data.genres.length > 0 &&
                                    data.genres.map((item, index) => (
                                        <span className="text-lg text-white inline-block" key={item.id}>
                                            {item}
                                            {data.genres.length !== index + 1 && <span key={item.id} className="mr-2">,</span>}
                                        </span>
                                    ))}
                            </div>
                            <p className="text-white text-lg leading-loose mb-7">
                                {data ? data.synopsis : ''}
                            </p>
                            <p className="font-normal text-lg text-white mb-7 flex items-center">
                                <StarOutlined className="mr-2 text-lg text-yellow-500 leading-none" />{" "}
                                <span className="leading-none">{rating(data ? data.rating : '')} / 10</span>
                            </p>
                            <Button
                                className="flex items-center uppercase font-semibold leading-1 px-5"
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
            <section className="pt-28">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-semibold leading-tight mb-8">
                        Cast and Crew Info
                    </h2>
                    <Swiper
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: true,
                        }}
                        spaceBetween={50}
                        slidesPerView={4}
                        modules={[Autoplay]}
                    >
                        {loading && loadingCast}
                        {data.casts &&
                            data.casts.length > 0 && data.casts.map((i, index) => (
                                <SwiperSlide key={i.id}>
                                    <div className="cast-profile" key={i.id}>
                                        <img className="w-full mb-3" alt={i.name} src={i.profile_path ? `https://image.tmdb.org/t/p/w500${i.profile_path}` : 'https://picsum.photos/id/11/283/424'} />
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
            <section className="py-28">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-4xl font-semibold leading-tight mb-0">
                            What People Says
                        </h2>
                        {success && (
                            <Button
                                ghost
                                className="min-w-[100px]"
                                type="primary"
                                size="large"
                                onClick={() => reviewsEvent.click()}
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
                        spaceBetween={50}
                        slidesPerView={3}
                        modules={[Autoplay]}
                    >
                        {!!reviews && reviews.length > 0 && reviews.map((i, index) => (
                            <SwiperSlide key={i._id} className="pb-1">
                                <div key={i._id} className="review-card p-7 border border-solid border-gray-200">
                                    <div className="flex items-center mb-5">
                                        <Avatar src={i.reviewer.image ? i.reviewer.image : `https://ui-avatars.com/api/?name=${i.reviewer.first_name + ' ' + i.reviewer.last_name}`} />
                                        <span className="ml-3 capitalize text-base">{i.reviewer.first_name + ' ' + i.reviewer.last_name}</span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-3 capitalize">
                                        {i.title}
                                    </h4>
                                    <p className="font-normal mb-3 flex items-center">
                                        <StarOutlined className="mr-2 text-yellow-500 leading-none" />{" "}
                                        <span className="leading-none">{rating(i ? i.rating : '')} / 10</span>
                                    </p>
                                    <p className="text-base mb-3 text-gray-500">{i.content}</p>
                                    <p className="text-sm m-0 text-gray-500">{moment(i.createdAt).format('d MMM Y')}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <FormReviews movie={id} events={reviewsEvent}/>
        </motion.div>
    );
}

export default DetailMovie;
