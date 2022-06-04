import React from "react";
import { StarOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const rating = (x) => Number.parseFloat(x).toFixed(1);

function MovieCard(props) {
  return (
    <Link to={`/movie/${props.id}`}>
      <div className="movie-card relative h-[500px] rounded-xl bg-cover bg-center" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.poster})`}}>
        <div className="movie-card-content">
          <p className=" text-sm text-white mb-3">{props.year}</p>
          <h4 className="font-bold text-lg text-white mb-3">
            {props.title}
          </h4>
          <p className="font-normal text-sm text-white mb-3 flex items-center">
            <StarOutlined className="mr-2 text-lg text-yellow-500 leading-none" />{" "}
            <span className="leading-none">{rating(props.rating)} / 10</span>
          </p>
          <div className="genre">
          {!!props.genres &&
            props.genres.length > 0 &&
            props.genres.map((item, index) => (
              <span className="text-sm text-white inline-block" key={index}>
                {item}
                {props.genres.length !== index + 1 && <span className="mr-2">,</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
