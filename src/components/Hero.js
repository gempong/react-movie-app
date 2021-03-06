import React from "react";

import { Button, Carousel, Row, Col } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

function Hero() {
    return (
        <Carousel autoplay effect="fade">
            <div>
                <div className="pt-11 hero-content h-[100vh] bg-[url('https://maxblizz.com/wp-content/uploads/2022/02/strang-4k-1-scaled-e1645329727286.jpg')] bg-no-repeat bg-cover flex items-center">
                    <div className="container 2xl:px-14 mx-auto xl:px-0 px-4">
                        <Row>
                            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                                <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5">
                                    Doctor Strange in the Multiverse of Madness
                                </h1>
                                <p className="text-white xl:text-lg sm:text-base text-sm leading-loose mb-7">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Button
                                    className="flex items-center uppercase font-semibold leading-1 px-5 rounded-full"
                                    type="primary"
                                    icon={<PlayCircleOutlined />}
                                    size="large"
                                >
                                    Watch trailer
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div>
                <div className="pt-11 hero-content h-[100vh] bg-[url('https://static.filmvandaag.nl/news/8897/moon-knight.jpg?ts=1646127338&width=1200&aspect_ratio=1:0.525')] bg-no-repeat bg-cover flex items-center">
                    <div className="container 2xl:px-14 mx-auto xl:px-0 px-4">
                        <Row>
                            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                                <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5">
                                    Moon Knight
                                </h1>
                                <p className="text-white xl:text-lg sm:text-base text-sm leading-loose mb-7">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Button
                                    className="flex items-center uppercase font-semibold leading-1 px-5 rounded-full"
                                    type="primary"
                                    icon={<PlayCircleOutlined />}
                                    size="large"
                                >
                                    Watch trailer
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div>
                <div className="pt-11 hero-content h-[100vh] bg-[url('https://www.entupantalla.com/wp-content/uploads/2022/04/JWDominion.jpg')] bg-no-repeat bg-cover flex items-center">
                    <div className="container 2xl:px-14 mx-auto xl:px-0 px-4">
                        <Row>
                            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                                <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5">
                                    Jurassic World Dominion
                                </h1>
                                <p className="text-white xl:text-lg sm:text-base text-sm leading-loose mb-7">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Button
                                    className="flex items-center uppercase font-semibold leading-1 px-5 rounded-full"
                                    type="primary"
                                    icon={<PlayCircleOutlined />}
                                    size="large"
                                >
                                    Watch trailer
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Carousel>
    );
}

export default Hero;
