import React from "react";
import { Typography, Rate } from "antd";
import "./view-item.css";
import {
  sliceOverwiew,
  dataFormat,
  viewImage,
  viewGenres,
  ratingColor,
} from "../helper";
import { GenresConsumer } from "../genres-context";

const { Text } = Typography;

const ViewItem = ({ movie, setRating }) => {
  return (
    <GenresConsumer>
      {(genres) => (
        <React.Fragment>
          <img
            className="card-img"
            src={viewImage(movie.poster_path)}
            alt={movie.title}
            title={movie.title}
          />
          <div className="card-content">
            <div className="horizontal">
              <h3 style={{ marginBottom: 0 }}>{movie.title}</h3>
              <div className={`rating ${ratingColor(movie.vote_average)}`}>
                <Text strong>{movie.vote_average}</Text>
              </div>
            </div>

            <Text type="secondary">{dataFormat(movie)}</Text>
            <div className="wrapper">
              {viewGenres(genres, movie.genre_ids).map((genre, index) => {
                return (
                  <Text code key={index}>
                    {genre}
                  </Text>
                );
              })}
            </div>

            <p className="description">{sliceOverwiew(movie.overview)}</p>
            <Rate
              allowHalf
              count={10}
              value={JSON.parse(localStorage.getItem(`${movie.id}`))}
              onChange={(e) => {
                setRating(movie, e);
              }}
            />
          </div>
        </React.Fragment>
      )}
    </GenresConsumer>
  );
};

export default ViewItem;
