import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../helpers/transition";

import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovies } from "../stores/movie/movieSlice";

import HeroInternal from "../components/HeroInternal";

function DetailMovie() {
    const { id } = useParams();
    const { data, loading, error } = useSelector((state) => state.movie.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailMovies(id));
    }, [dispatch, id]);

    if (error) {
        console.log(error)
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ delay: 0.7 }}
            variants={pageVariants}
        >
            <HeroInternal pageTitle={data.title} movieYear={data.year} />
            <section className="py-28">
                <div className="container mx-auto">
                    {loading && <h1>Loading...</h1>}
                    <img src={data.poster} alt={data.title} />
                    <h1>{!loading && !!data && data.title}</h1>
                    <p>{!loading && !!data && data.synopsis}</p>
                    <ul>
                        {!loading &&
                            !!data.directors &&
                            data.directors.map((director) => (
                                <li key={director.id}>{director.name}</li>
                            ))}
                    </ul>
                    <ul>
                        {!loading &&
                            !!data.genres &&
                            data.genres.map((genre, index) => <li key={index}>{genre}</li>)}
                    </ul>
                </div>
            </section>
        </motion.div>
    );
}

export default DetailMovie;
