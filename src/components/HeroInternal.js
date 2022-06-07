import React from "react";
import { Row, Col } from "antd";

function HeroInternal(props) {
    return (
        <section className="hero-content pt-24 h-[50vh] bg-[url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80')] bg-no-repeat bg-cover flex items-center">
            <div className="container 2xl:px-14 mx-auto xl:px-0 px-4">
                <Row>
                    <Col lg={{ span: 10 }} xs={{ span: 24 }}>
                        <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5 capitalize">
                            {props.pageTitle}
                        </h1>
                        <p className="text-white xl:text-lg sm:text-base text-sm leading-loose mb-7">
                            {props.movieYear}
                        </p>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default HeroInternal;
