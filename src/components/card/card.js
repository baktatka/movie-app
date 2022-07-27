import React from "react";
import { Spin } from "antd";
import ViewItem from "../view-item";
import "./card.css";

function Card({ loading, movieList, setRating }) {
  return movieList.map((movie) => {
    return (
      <div className="card" key={movie.id}>
        {loading ? <Spin style={{ alignSelf: "center" }} /> : null}
        {!loading ? <ViewItem movie={movie} setRating={setRating} /> : null}
      </div>
    );
  });
}

export default Card;
