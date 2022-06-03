import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import DetailMovie from "./pages/DetailMovie";
import MovieByGenre from "./pages/MovieByGenre";
import SearchMovies from "./pages/SearchMovies";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <Router>
            <Navbar />
            <AnimatePresence exitBeforeEnter>
                <ScrollToTop>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/movies" component={Movies} />
                        <Route exact path="/movie/:id" component={DetailMovie} />
                        <Route exact path="/search/:search" component={SearchMovies} />
                        <Route exact path="/genre/:genre" component={MovieByGenre} />
                    </Switch>
                </ScrollToTop>
            </AnimatePresence>
            <Footer />
        </Router>
    );
}

export default App;
